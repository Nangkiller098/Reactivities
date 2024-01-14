/* The code provided is a C# class named "Create" within the "Application.Activities" namespace. It
contains three nested classes: "Command", "CommandValidator", and "Handler". */

using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Activity Activity { get; set; }
        }
        public class CommanValidator : AbstractValidator<Command>
        {
            public CommanValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
            }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly ILogger<Create> _logger;
            public Handler(DataContext context, IUserAccessor userAccessor, ILogger<Create> logger)
            {
                _logger = logger;
                _userAccessor = userAccessor;
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                /* The code is retrieving the user from the database based on the username of the
                currently logged-in user. */
                var user = await _context
                .Users.FirstOrDefaultAsync(x =>
                x.UserName == _userAccessor.GetUserName());

                /* The code is creating a new instance of the `ActivityAttendee` class and assigning
                values to its properties. */
                var attendee = new ActivityAttendee
                {
                    AppUser = user,
                    Activity = request.Activity,
                    IsHost = true
                };
                request.Activity.Attendees.Add(attendee);
                _context.Activities.Add(request.Activity);
                var result = await _context.SaveChangesAsync() > 0;

                /* The code is checking the result of the `SaveChangesAsync()` method, which returns
                the number of entities written to the database. If the result is not greater than 0,
                it means that the activity creation failed. In that case, it returns a failure
                result with the message "Failed to create activity" using the
                `Result<Unit>.Failure()` method. */
                if (!result) return Result<Unit>.Failure("Failed to create activity");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}