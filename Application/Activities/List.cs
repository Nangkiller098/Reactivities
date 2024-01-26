using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ActivityDto>>>
        {
            public PagingParam Param { get; set; }
        }
        public class Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;
            private readonly IUserAccessor _userAccessor = userAccessor;


            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Activities
                .OrderBy(d => d.Date)
                .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider,
                 new { currentUsername = _userAccessor.GetUserName() })
                .AsQueryable();

                return Result<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>.CreateAsync(query, request.Param.PageNumber, request.Param.PageSize)
                );
            }
        }
    }
}