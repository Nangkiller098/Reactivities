/* The code you provided is a C# class that defines a controller called `BuggyController`. This
controller is used to handle HTTP requests and return appropriate responses. */
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly ILogger<BuggyController> _logger;
        public BuggyController(ILogger<BuggyController> logger)
        {
            _logger = logger;
        }

        [HttpGet("not-found")]
        public ActionResult GetNotFound()
        {
            return NotFound();

        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest()
        {
            return BadRequest("This is a bad request");
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }

        [HttpGet("unauthorised")]
        public ActionResult GetUnauthorised()
        {
            return Unauthorized();
        }
    }
}

