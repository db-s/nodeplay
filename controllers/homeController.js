// Home Controller

exports.index = function(req, res) {
  return {
    content: "This is my content"
  }
};

exports.test = function(req, res) {
  return {
    user: {
      FirstName: "Mike",
      LastName: "Jordan"
    }
  }
};
