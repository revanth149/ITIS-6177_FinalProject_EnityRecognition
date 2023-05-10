// app.get('/RecognizeEntityLinking',(req,res,next)=>{
//   res.render('RegEntityLinking');
// });

// app.get('/RecognizeEntities',(req,res,next)=>{
//   res.render('RegEntities');
// });

// app.get('/RecognizePiiEntities',(req,res,next)=>{
//   res.render('RegPiiEntities');
// });

// app.get('/ExtractKeyPhrase',(req,res,next)=>{
//   res.render('ExtractKeyPhrase');
// });

exports.link = (req,res)=>{
    res.render('RegEntityLinking');
};

exports.RegEntity = (req,res)=>{
    res.render('RegEntities');
};

exports.RegPiiEntity = (req,res)=>{
    res.render('RegPiiEntities');
};

exports.KeyPhrase = (req,res)=>{
    res.render('ExtractKeyPhrase');
};