using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccerssor _photoAccerssor;
            private readonly DataContext _context;
            public Handler(DataContext context, IPhotoAccerssor photoAccerssor, IUserAccessor userAccessor)
            {
                _context = context;
                _photoAccerssor = photoAccerssor;
                _userAccessor = userAccessor;

            }
            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                //frist check user they login or not
                var user = await _context.Users.Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUserName());
                if (user == null) return null;

                //then add photo to api
                var photoUploadResult = await _photoAccerssor.AddPhoto(request.File);

                //asign value to photo model
                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                //check photo exist or not
                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

                //add photo to user
                user.Photos.Add(photo);

                //save to database
                var result = await _context.SaveChangesAsync() > 0;
                if (result) return Result<Photo>.Success(photo);
                return Result<Photo>.Failure("Problem adding photo");
            }
        }
    }
}