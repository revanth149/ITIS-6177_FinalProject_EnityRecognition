# Entity Recognition

This API is a wrapper to the [Azure's cognitive services API](https://azure.microsoft.com/en-us/products/cognitive-services/language-service/) with different languages services [language services]()

[Entity recognition](https://en.wikipedia.org/wiki/Azure_Cognitive_Search) using these services for Language enables you to build apps with industry-leading natural language understanding capabilities without machine learning expertise.

![image]()
ref: 

# Development

Azure Cognitive Search is the only cloud search service with built-in AI capabilities that enrich all types of information to help you identify and explore relevant content at scale. Use cognitive skills for vision, language, and speech, or use custom machine learning models to uncover insights from all types of content. Azure Cognitive Search also offers semantic search capability, which uses advanced machine learning techniques to understand user intent and contextually rank the most relevant search results.

The request made to the APIs are asynchronous and [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) is used for calling the APIs and waiting for their responses.

**Environment And Libraries Used**

API Recognition:

- Protocol used: HTTP
- Development language: Node.js - Express.js
- Libraries: @azure/ai-text-analytics, swagger-jsdoc, swagger-ui-express
- API Checker : swagger

# Try Out

Temporarily the API is hosted in one of the droplets in Digital Ocean, to run some tests and checkout the functionality

### Server Endpoint

```
http://[digitalOcean_host]:5000/
```

### API Endpoint

```
http://[digitalOcean_host]:5000/api/v1/sentiments/
```

### Post Request Body

```Array
[ "<Your Text or Conversation goes here>"]
```

## Possible Responses :

| Response code | Description             |
| ------------- | ----------------------- |
| 200           | OK                      |
| 400           | Input Validation Failed |
| 500           | Internal Server Error   |

#

### Output:

Contains the object with identified language, overall sentiment and confidences along with analysis of each sentences in the provided text

## Swagger

Swagger for the API added for testing the API withing the host

```
http://162.243.172.115:5000/docs
```

# Setup in Local

1. Create [Azure language resource](https://azure.microsoft.com/en-us/products/cognitive-services/language-service/#overview) and copy the Key and Endpoint
2. Set the Key and Endpoint to the enviroment variables with variable names as _LANGUAGE_KEY_ and _LANGUAGE_ENDPOINT_
3. Make sure you have installed node, if not download and install the latest version of node
4. Clone the repository to local machine
5. Open terminal and run the command "npm i"
6. To run the server locally use following command "node app.js"
7. Test the server with the following endpoint "http://localhost:5000/"
8. To test the API, send the post request to the following endpoint "http://localhost:5000/api/v1/sentiments/" with the payload containing the text to do sentimental analysis.
9. For swagger docs, use the following endpoint "http://localhost:5000/docs"

# Usage:

**Request:**

```
curl -X 'POST' \
  'http://162.243.172.115:5000/api/v1/sentiments/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "text": "The rooms were beautiful but dirty. The AC was good and quiet, but the elevator was broken"
}'
```

**Response:**

```JSON
{
  "language": "English",
  "sentiment": "negative",
  "confidenceScores": {
    "positive": 0,
    "neutral": 0,
    "negative": 0.99
  },
  "sentences": [
    {
      "text": "The rooms were beautiful but dirty. ",
      "sentiment": "negative",
      "confidenceScores": {
        "positive": 0.01,
        "neutral": 0.01,
        "negative": 0.99
      },
      "opinions": [
        {
          "text": "rooms",
          "sentiment": "mixed",
          "confidenceScores": {
            "positive": 0.5,
            "negative": 0.5
          },
          "assessments": [
            {
              "text": "beautiful",
              "sentiment": "positive"
            },
            {
              "text": "dirty",
              "sentiment": "negative"
            }
          ]
        }
      ]
    },
    {
      "text": "The AC was good and quiet, but the elevator was broken",
      "sentiment": "negative",
      "confidenceScores": {
        "positive": 0,
        "neutral": 0,
        "negative": 1
      },
      "opinions": [
        {
          "text": "AC",
          "sentiment": "positive",
          "confidenceScores": {
            "positive": 1,
            "negative": 0
          },
          "assessments": [
            {
              "text": "good",
              "sentiment": "positive"
            },
            {
              "text": "quiet",
              "sentiment": "positive"
            }
          ]
        },
        {
          "text": "elevator",
          "sentiment": "negative",
          "confidenceScores": {
            "positive": 0.01,
            "negative": 0.99
          },
          "assessments": [
            {
              "text": "broken",
              "sentiment": "negative"
            }
          ]
        }
      ]
    }
  ]
}
```

**Request:**

```
curl -X 'POST' \
  'http://162.243.172.115:5000/api/v1/sentiments/' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "text": "Las habitaciones eran hermosas pero sucias. El aire acondicionado era bueno y silencioso, pero el ascensor estaba roto."
}'

```

**Response:**

```JSON
{
  "language": "Spanish",
  "sentiment": "negative",
  "confidenceScores": {
    "positive": 0.02,
    "neutral": 0,
    "negative": 0.98
  },
  "sentences": [
    {
      "text": "Las habitaciones eran hermosas pero sucias. ",
      "sentiment": "negative",
      "confidenceScores": {
        "positive": 0.03,
        "neutral": 0.01,
        "negative": 0.96
      },
      "opinions": [
        {
          "text": "habitaciones",
          "sentiment": "positive",
          "confidenceScores": {
            "positive": 0.51,
            "negative": 0.49
          },
          "assessments": [
            {
              "text": "hermosas",
              "sentiment": "positive"
            },
            {
              "text": "sucias",
              "sentiment": "negative"
            }
          ]
        }
      ]
    },
    {
      "text": "El aire acondicionado era bueno y silencioso, pero el ascensor estaba roto.",
      "sentiment": "negative",
      "confidenceScores": {
        "positive": 0,
        "neutral": 0,
        "negative": 1
      },
      "opinions": [
        {
          "text": "aire acondicionado",
          "sentiment": "positive",
          "confidenceScores": {
            "positive": 1,
            "negative": 0
          },
          "assessments": [
            {
              "text": "bueno",
              "sentiment": "positive"
            },
            {
              "text": "silencioso",
              "sentiment": "positive"
            }
          ]
        },
        {
          "text": "ascensor",
          "sentiment": "negative",
          "confidenceScores": {
            "positive": 0.04,
            "negative": 0.96
          },
          "assessments": [
            {
              "text": "roto",
              "sentiment": "negative"
            }
          ]
        }
      ]
    }
  ]
}
```
