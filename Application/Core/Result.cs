namespace Application.Core
{
    public class Result<T>
    {
        public bool IsSucess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }
        public static Result<T> Success(T value) => new() { IsSucess = true, Value = value };
        public static Result<T> Failure(string error) => new()
        {
            IsSucess = false,
            Error = error
        };
    }
}