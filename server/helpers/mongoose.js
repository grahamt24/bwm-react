
module.exports = {
  normalizeErrors: function(errors){
    let normalizedErrors = [];

    for(let property in errors){
      if(errors.hasOwnProperty(property)){
        normalizedErrors.push({title: property, detail: errors[property].message});
      }
    }
    return normalizedErrors;
  }
};
