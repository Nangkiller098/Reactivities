using System.Text.Json;

namespace API.Extensions
{
    public static class HttpExtensions
    {
        public static void AddPaginationHeader(this HttpResponse response, int currentPage, int itemPerPages, int totalItems, int totalPages)
        {
            var paginationHeader = new
            {
                currentPage,
                itemPerPages,
                totalItems,
                totalPages
            };
            response.Headers.Append("Pagination", JsonSerializer.Serialize(paginationHeader));
            response.Headers.Append("Access-Control-Expose-Headers", "Pagination");
        }
    }
}