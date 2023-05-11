# Entity Recognition

This API is a wrapper to the [Azure's cognitive services API](https://azure.microsoft.com/en-us/products/cognitive-services/language-service/) with different languages services.

[Entity recognition](https://en.wikipedia.org/wiki/Azure_Cognitive_Search) using these services for Language enables you to build apps with industry-leading natural language understanding capabilities without machine learning expertise.


![image](/public/images/si10.PNG)
![image](/public/images/si8.PNG)

* ref: https://learn.microsoft.com/en-us/azure/cognitive-services/language-service/custom-text-classification/overview

# Development

Azure Cognitive Search is the only cloud search service with built-in AI capabilities that enrich all types of information to help you identify and explore relevant content at scale. Use cognitive skills for vision, language, and speech, or use custom machine learning models to uncover insights from all types of content. Azure Cognitive Search also offers semantic search capability, which uses advanced machine learning techniques to understand user intent and contextually rank the most relevant search results.

**Environment And Libraries Used**

Entity Recognition:

- Protocol used: HTTP
- Development language: Node.js - Express.js
- Libraries: @azure/ai-text-analytics, swagger-jsdoc, swagger-ui-express
- API Checker : swagger, postman

## Data Validation
I had verified if the input to the API is an array of strings. The API raises an error if it is of any other datatype.
![Image](/public/images/si1.PNG)

## Data Sanitization
* I had used data sanitization techniques to avoid like .trim() to avoid spaces and replaced other special characters.To ensure the input  contains only text. 

![Image](/public/images/si2.PNG)

# Try Out

Temporarily the API is hosted in one of the droplets in Digital Ocean, to run some tests and checkout the functionality

### Server Endpoint

```
http://159.223.131.133:3000/
```

### API Endpoint
* Used versioning to the API which is one of the good coding practice. It also helps us to iterate faster when the needed changes are identified in the APIs
```
http://159.223.131.133:3000/api/v1/recognition/
```

### Post Request Body
```application/json```
```Array of strings ```
```[ "<Your Text or Conversation goes here>"]```

## Possible Responses :

| Response code | Description                                                         |
| ------------- | ------------------------------------------------------------------  |
| 200           | Entities recognized successfully                                    |
| 400           | Invalid data format. The input must be a non-empty array of strings |
| 500           | Something went wrong on the server. Please try again later.         |


### Output:

Identifies, Recognize the Entities and Key phrases and link them.

## Swagger Endpoint


Swagger for the API added for testing the API withing the host

```
http://159.223.131.133:3000/docs
```

# Setup in Local

1. Create [Azure language resource](https://azure.microsoft.com/en-us/products/cognitive-services/language-service/#overview) and copy the Key and Endpoint
2. Set the Key and Endpoint as environment variables with the variable names API_KEY and API_ENDPOINT respectively.
3. Ensure that you have Node.js installed. If not, download and install the latest version of Node.js.
4. Clone the repository to your local machine.
5. Open a terminal and navigate to the project's directory, then run the command npm install to install the required dependencies.
6. To start the server locally, use the command nodemon app.js in the terminal.
7. Test the server by accessing the following endpoint in your browser: http://localhost:3000/
8.To test the API, send a POST request to the following endpoint: http://localhost:3000/api/v1/entity/, with the payload containing the text you want to analyze for sentiment.
9.For Swagger documentation, use the following endpoint in your browser: http://localhost:3000/docs

# Usage:

## EntityRecognition

* This API uses the entity recognition endpoint to detect entities in a document using Named Entity Recognition (NER) and prints them along with their recognized entity type.
 
**Request:**

```
curl -X 'POST' \
  'http://159.223.131.133:3000/apis/v1/entity/RecognizeEntities' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '[
  "This is Revanth Kumar Galla from India"
]'
```

**Response:**

```[
  {
    "id": "0",
    "warnings": [],
    "entities": [
      {
        "text": "Revanth Kumar Galla",
        "category": "Person",
        "offset": 8,
        "length": 19,
        "confidenceScore": 1
      },
      {
        "text": "India",
        "category": "Location",
        "subCategory": "GPE",
        "offset": 33,
        "length": 5,
        "confidenceScore": 1
      }
    ]
  }
]
```
## PiiEntityRecognition

  * This API uses the PII-recognition endpoint to detect sensitive personally identifiable information in documents (such as social security numbers, addresses, and more). The API returns information about the location of the sensitive information in the text, which we use to perform redaction of the PII text.

**Request:**

```
curl -X 'POST' \
  'http://159.223.131.133:3000/apis/v1/entity/RecognizePiiEntities' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '[
  "I am Revanth Kumar Galla with mobile number 980-382-9999 and ssn 852147963"
]'

```

**Response:**

```[
  {
    "id": "0",
    "warnings": [],
    "redactedText": "I am ******************* with mobile number ************ and ssn *********",
    "entities": [
      {
        "text": "Revanth Kumar Galla",
        "category": "Person",
        "offset": 5,
        "length": 19,
        "confidenceScore": 0.84
      },
      {
        "text": "980 382 9999",
        "category": "PhoneNumber",
        "offset": 44,
        "length": 12,
        "confidenceScore": 0.8
      },
      {
        "text": "852147963",
        "category": "PhoneNumber",
        "offset": 65,
        "length": 9,
        "confidenceScore": 0.8
      },
      {
        "text": "852147963",
        "category": "USSocialSecurityNumber",
        "offset": 65,
        "length": 9,
        "confidenceScore": 0.55
      }
    ]
  }
]
```
## Extract Key Phrase

* This API call uses the key-phrase extraction endpoint to determine which words or phrases in a document are of particular importance.

**Request:**

```
curl -X 'POST' \
  'http://159.223.131.133:3000/apis/v1/entity/ExtractKeyPhrase' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '[
  "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
  "I need to take my cat to the veterinarian.",
  "I will travel to South America in the summer."
]'
```

**Response:**

```[
  {
    "id": "0",
    "warnings": [],
    "keyPhrases": [
      "King County  Washington  United States",
      "Redmond",
      "city",
      "Seattle"
    ]
  },
  {
    "id": "1",
    "warnings": [],
    "keyPhrases": [
      "cat",
      "veterinarian"
    ]
  },
  {
    "id": "2",
    "warnings": [],
    "keyPhrases": [
      "South America",
      "summer"
    ]
  }
]
```

## Recognize Entity Linking

* This API uses the linked entity recognition endpoint to detect well-known entities in a document and connect (link) them to entries in an external knowledge base (such as Wikipedia) that contain information about the entity.

**Request:**

```
curl -X 'POST' \
  'http://159.223.131.133:3000/apis/v1/entity/RecognizeEntityLinking' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '[
  "I am studying in Unc charlotte"
]'

```

**Response:**

```[
  {
    "id": "0",
    "warnings": [],
    "entities": [
      {
        "name": "University of North Carolina at Charlotte",
        "matches": [
          {
            "confidenceScore": 0.2,
            "text": "Unc charlotte",
            "offset": 17,
            "length": 13
          }
        ],
        "language": "en",
        "dataSourceEntityId": "University of North Carolina at Charlotte",
        "url": "https://en.wikipedia.org/wiki/University_of_North_Carolina_at_Charlotte",
        "dataSource": "Wikipedia",
        "bingEntitySearchApiId": "8868d55f-2f1f-1ccb-23ed-5a37e83e769c"
      }
    ]
  }
]
```
## Use the web application

* Had also developed a basic front-end version to these API's which allows users to send the request.
![Image](/public/images/si3.PNG)
* You can click on the respective link to test the API. 
* You can enter the text in the form of array of Strings and click submit. 
![Image](/public/images/si4.PNG)
* which will use the respective azure endpoints and extact the entities.
![Image](/public/images/si5.PNG) 

## Use Swagger in the web application

* Implemented swagger to test the API's 
* You can use the test it out option on the different requests to test the API
* ![Image](/public/images/si6.PNG)

## Testing using PostMan

* Had verified the API's using postman.
![Image](/public/images/si9.PNG) 
