using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
                if (user == null) return null;
                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
                if (photo == null) return null;
                var currentmain = user.Photos.FirstOrDefault(x => x.IsMain);
                if (currentmain != null) currentmain.IsMain = false;
                photo.IsMain = true;
                var sucuess = await _context.SaveChangesAsync() > 0;
                if (sucuess) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Problem setting photo main ");
            }
        }
    }
}