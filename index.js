var AWS = require("aws-sdk");
var core = require("@actions/core");

try {
  var awsRegion = core.getInput("aws-region");
  var awsAccessKey = core.getInput("aws-access-key");
  var awssecretKey = core.getInput("aws-secret-key");
  var pipelineName = core.getInput("pipeline-name");

  AWS.config = new AWS.Config();
  AWS.config.region = awsRegion;
  AWS.config.accessKeyId = awsAccessKey;
  AWS.config.secretAccessKey = awssecretKey;

  var codepipeline = new AWS.CodePipeline();
  var pipeline = {
    name: pipelineName,
  };

  codepipeline.startPipelineExecution(pipeline, function (err, okData) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(okData);
    }
  });
} catch (error) {
  core.setFailed(error.message);
}
