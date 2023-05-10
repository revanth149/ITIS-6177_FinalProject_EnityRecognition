require('dotenv').config()
const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const { TextAnalysisClient, AzureKeyCredential} = require("@azure/ai-text-analytics");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors')
const basepath = '/apis/v1/entity'
const mainRoutes = require('./routes/mainRoutes');

const options = {
    swaggerDefinition: {
        info: { 
            title: 'Entity API Documentation',
            version: '1.0.0',
            description: 'Entity API Documentation',
        },
        host: 'localhost:3000/',
        basepath: '/apis/v1/entity/'
    },
    apis:['./app.js'],
};

const specs = swaggerJsdoc(options);
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use('/docs',swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const client = new TextAnalysisClient(process.env.API_ENDPOINT, new AzureKeyCredential(process.env.API_KEY));

const validateData = (data) => {
    if (!Array.isArray(data) || data.length <= 0)
    {
      // If data is not an array or empty data, return false
      return false;
    }
    
    for (let i = 0; i < data.length; i++) {
      if (typeof data[i] !== "string") {
        // If any element is not a string, return false
        return false;
      }
    }
    
    // If all elements are strings return true
    return true;
};
  


/**
 * @swagger
 * /apis/v1/entity/RecognizeEntities:
 *    post:
 *      description: Analyze input data and recognize entities in English language
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: data
 *            in: body
 *            description: An array of strings to be analyzed for entity recognition
 *            required: true
 *            schema:
 *              type: array
 *              items:
 *                type: string
 *                example: "This is Revanth Kumar Galla from India"
 *      responses:
 *        '200':
 *          description: Entities recognized successfully
 *        '400':
 *          description: Invalid data format. The input must be a non-empty array of strings.
 *        '500':
 *          description: Something went wrong on the server. Please try again later.
 */
app.post(basepath+'/RecognizeEntities', urlencodedParser, (req, res) => {
  function escapeString(str) {
    return str.replace(/[-[\]{}()*+?.>,<\\^$|#\s]/g, ' ');
  }
  let data = req.body;
  if(typeof(data) != Object)
  {
    if(data.sentence)
    data = [data.sentence];
  }
  data = data.map(str => escapeString(str.trim().replace(/\s+/g, ' ')));
  console.log(data);
    if (!validateData(data)) {
      // If the input data is not valid, send a 400 Bad Request response with an error message
      const error = new Error("Invalid data format. The input must be a non-empty array of strings.");
      res.status(400).send(error.message);
      return;
    }
  
    client.analyze("EntityRecognition", data, "en")
      .then(result => {
        // If the analysis is successful, send the result as the response
        res.send(result);
    })
      .catch(err => {
        // If an error occurs, send a 500 Internal Server Error response with a generic error message
        console.error("Error analyzing entities:", err);
        const error = new Error("Something went wrong. Please try again later.");
        res.status(500).send(error.message);
    });
});

/**
 * @swagger
 * /apis/v1/entity/RecognizePiiEntities:
 *    post:
 *      description: Analyze input data and recognize sensitive personally identifiable entities
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: data
 *            in: body
 *            description: An array of strings to be analyzed for pii entity recognition
 *            required: true
 *            schema:
 *              type: array
 *              items:
 *                type: string
 *                example: "I am Revanth Kumar Galla with mobile number 980-382-9999 and ssn 852147963"
 *      responses:
 *        '200':
 *          description: Entities recognized successfully
 *        '400':
 *          description: Invalid data format. The input must be a non-empty array of strings.
 *        '500':
 *          description: Something went wrong on the server. Please try again later.
 */
app.post(basepath+'/RecognizePiiEntities', urlencodedParser, (req, res) => {
  function escapeString(str) {
    return str.replace(/[-[\]{}()*+?.>,<\\^$|#\s]/g, ' ');
  }
  let data = req.body;
  if(typeof(data) != Object)
  {
    if(data.sentence)
    data = [data.sentence];
  }
  data = data.map(str => escapeString(str.trim().replace(/\s+/g, ' ')));
  console.log(data);
    if (!validateData(data)) {
      // If the input data is not valid, send a 400 Bad Request response with an error message
      const error = new Error("Invalid data format. The input must be a non-empty array of strings.");
      res.status(400).send(error.message);
      return;
    }
  
    client.analyze("PiiEntityRecognition", data, "en")
      .then(result => {
        // If the Pii Entity Recognition is successful, send the result as the response
        res.send(result);
    })
      .catch(err => {
        // If an error occurs, send a 500 Internal Server Error response with a generic error message
        console.error("Error analyzing entities:", err);
        const error = new Error("Something went wrong. Please try again later.");
        res.status(500).send(error.message);
    });
});



/**
 * @swagger
 * /apis/v1/entity/ExtractKeyPhrase:
 *    post:
 *      description: Analyze input data and recognize and extract the key phrases
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: data
 *            in: body
 *            description: An array of strings to be analyzed for key phrase extraction
 *            required: true
 *            schema:
 *              type: string
 *              example: ["Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.","I need to take my cat to the veterinarian.","I will travel to South America in the summer."]
 *      responses:
 *        '200':
 *          description: Entities recognized successfully
 *        '400':
 *          description: Invalid data format. The input must be a non-empty array of strings.
 *        '500':
 *          description: Something went wrong on the server. Please try again later.
 */
app.post(basepath+'/ExtractKeyPhrase', urlencodedParser, (req, res) => {
  function escapeString(str) {
    return str.replace(/[-[\]{}()*+?.>,<\\^$|#\s]/g, ' ');
  }
    let data = req.body;
    if(typeof(data) != Object)
    {
      if(data.sentence)
      data = [data.sentence];
    }
    // Trimdata = data.map(str=>{ console.log(str.trim())})
    // console.log(data)
    data = data.map(str => escapeString(str.trim().replace(/\s+/g, ' ')));
    console.log(data);

    if (!validateData(data)) {
      // If the input data is not valid, send a 400 Bad Request response with an error message
      const error = new Error("Invalid data format. Th e input must be a non-empty array of strings.");
      res.status(400).send(error.message);
      return;
    }
  
    client.analyze("KeyPhraseExtraction", data, "en")
      .then(result => {
        // If the Key Phrase Extraction is successful, send the result as the response
        res.send(result);
    })
      .catch(err => {
        // If an error occurs, send a 500 Internal Server Error response with a generic error message
        console.error("Error analyzing entities:", err);
        const error = new Error("Something went wrong. Please try again later.");
        res.status(500).send(error.message);
    });
});

/**
 * @swagger
 * /apis/v1/entity/RecognizeEntityLinking:
 *    post:
 *      description: Analyze input data and Limnk the Enities
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: data
 *            in: body
 *            description: An array of strings to be analyzed for entity Liniking
 *            required: true
 *            schema:
 *              type: array
 *              items:
 *                type: string
 *                example: "I am studying in Unc charlotte"
 *      responses:
 *        '200':
 *          description: Entities recognized successfully
 *        '400':
 *          description: Invalid data format. The input must be a non-empty array of strings.
 *        '500':
 *          description: Something went wrong on the server. Please try again later.
 */
app.post(basepath+'/RecognizeEntityLinking', urlencodedParser, (req, res) => {

    function escapeString(str) {
    return str.replace(/[-[\]{}()*+?.>,<\\^$|#\s]/g, ' ');
  }

    let data = req.body;
    if(typeof(data) != Object)
    {
      if(data.sentence)
      data = [data.sentence];
    }

    data = data.map(str => escapeString(str.trim().replace(/\s+/g, ' ')));
    console.log(data);
    if (!validateData(data)) {
      // If the input data is not valid, send a 400 Bad Request response with an error message
      const error = new Error("Invalid data format. The input must be a non-empty array of strings.");
      res.status(400).send(error.message);
      return;
    }
  
    client.analyze("EntityLinking", data, "en")
      .then(result => {
        // If the Entity Linking is successful, send the result as the response
        res.send(result);
    })
      .catch(err => {
        // If an error occurs, send a 500 Internal Server Error response with a generic error message
        console.error("Error analyzing entities:", err);
        const error = new Error("Something went wrong. Please try again later.");
        res.status(500).send(error.message);
    });
});

app.set('view engine', 'ejs'); 
app.use(express.static('public'));

app.get('/', (req, res)=>{
  res.render('index');
});

app.use('/apis/v1/entity/' , mainRoutes);


app.listen(port, () => {
    console.log('Entity Documentation app is listening on port',port);
});
