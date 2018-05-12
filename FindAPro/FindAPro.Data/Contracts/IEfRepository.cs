using FindAPro.Data.Model.Contracts;
using System;
using System.Linq;

namespace FindAPro.Data.Contracts
{
    public interface IEfRepository<T> where T : class, IDeletable
    {
        IQueryable<T> All { get; }

        IQueryable<T> AllAndDeleted { get; }

        void Add(T entity);

        void Delete(T entity);

        void Update(T entity);

        T GetById(Guid? id);
    }
}
