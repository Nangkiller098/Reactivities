

using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {

            public string Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly IPhotoAccerssor _photoAccerssor;
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            public Handler(DataContext context, IPhotoAccerssor photoAccerssor, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccerssor = photoAccerssor;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
                if (user == null) return null;
                //reson we dont use await because it not go to database 
                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
                if (photo == null) return null;
                if (photo.IsMain) return Result<Unit>.Failure("You cannot delete your main Photo");
                var result = await _photoAccerssor.DeletePhoto(photo.Id);
                if (result == null) return Result<Unit>.Failure("Porblem delete photo from Cloudinary");
                user.Photos.Remove(photo);
                var sucess = await _context.SaveChangesAsync() > 0;
                if (sucess) return Result<Unit>.Success(Unit.Value);
                return Result<Unit>.Failure("Porblem delete photo from Cloudinary");

            }
        }
    }
}