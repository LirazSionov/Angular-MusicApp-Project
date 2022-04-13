using System;

namespace API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber {get; set;}
        private int _pageSize = 10;
        public int PageSize
        {
            get => _pageSize; // getter
            set => _pageSize = Math.Min(MaxPageSize, value); // setter
        }
        public string CurrentUsername { get; set; }
        public string InstrumentType { get; set; }
        public string MinCost { get; set; }
        public string MaxCost { get; set; }
        public string OrderBy { get; set; } = "LastApdate";
        
        
        
        
        
        
    }
}