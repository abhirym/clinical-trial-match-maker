
from unittest.mock import Mock, patch

import httpx
from fastapi.testclient import TestClient

from main import app


client = TestClient(app)


# 1. Test the root endpoint
def test_root_returns_api_status():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {
        "message": "Clinical Trial Match Maker API is running!"
    }


# 2. Test successful trial search and response structure
@patch("main.httpx.get")
def test_search_returns_trial_records(mock_get):
    mock_response = Mock()

    mock_response.json.return_value = {
        "studies": [
            {
                "protocolSection": {
                    "identificationModule": {
                        "nctId": "NCT01234567",
                        "briefTitle": "Example Melanoma Study",
                    },
                    "statusModule": {
                        "overallStatus": "RECRUITING"
                    },
                    "conditionsModule": {
                        "conditions": ["Melanoma"]
                    },
                    "designModule": {
                        "studyType": "INTERVENTIONAL"
                    },
                    "eligibilityModule": {
                        "eligibilityCriteria": "Example criteria"
                    },
                }
            }
        ],
        "nextPageToken": "example-next-token",
    }

    mock_get.return_value = mock_response

    response = client.get(
        "/api/trials",
        params={
            "condition": "melanoma",
            "page_size": 5,
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert data["condition"] == "melanoma"
    assert data["count"] == 1
    assert data["page_size"] == 5
    assert data["next_page_token"] == "example-next-token"

    trial = data["trials"][0]

    assert trial["nct_id"] == "NCT01234567"
    assert trial["title"] == "Example Melanoma Study"
    assert trial["status"] == "RECRUITING"
    assert trial["conditions"] == ["Melanoma"]
    assert trial["study_type"] == "INTERVENTIONAL"
    assert trial["eligibility_criteria"] == "Example criteria"
    assert trial["source"] == "ClinicalTrials.gov"

    mock_get.assert_called_once()


# 3. Test invalid page size
def test_page_size_above_limit_is_rejected():
    response = client.get(
        "/api/trials",
        params={
            "condition": "melanoma",
            "page_size": 101,
        },
    )

    assert response.status_code == 422


# 4. Test pagination token forwarding
@patch("main.httpx.get")
def test_pagination_token_is_forwarded(mock_get):
    mock_response = Mock()
    mock_response.json.return_value = {
        "studies": []
    }

    mock_get.return_value = mock_response

    response = client.get(
        "/api/trials",
        params={
            "condition": "melanoma",
            "page_size": 5,
            "page_token": "example-next-token",
        },
    )

    assert response.status_code == 200

    request_params = mock_get.call_args.kwargs["params"]

    assert request_params["pageToken"] == "example-next-token"
    assert request_params["pageSize"] == 5
    assert request_params["query.cond"] == "melanoma"


# 5. Test external API timeout
@patch("main.httpx.get")
def test_timeout_returns_504(mock_get):
    mock_get.side_effect = httpx.TimeoutException("Request timed out")

    response = client.get("/api/trials")

    assert response.status_code == 504
    assert response.json()["detail"] == (
        "ClinicalTrials.gov took too long to respond."
    )


# 6. Test external API connection failure
@patch("main.httpx.get")
def test_external_api_failure_returns_502(mock_get):
    mock_get.side_effect = httpx.ConnectError(
        "Connection failed"
    )

    response = client.get("/api/trials")

    assert response.status_code == 502
    assert response.json()["detail"] == (
        "Unable to retrieve trials from ClinicalTrials.gov."
    )
