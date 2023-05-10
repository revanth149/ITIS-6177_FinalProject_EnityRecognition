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