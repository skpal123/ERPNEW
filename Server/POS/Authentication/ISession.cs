using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ERPWebApiService.Authentication
{
    public interface ISession
    {
        //SessionStatus Status { get; set; }

        /// <summary>
        /// The unique identifier for this session.
        /// </summary>
        Guid SessionToken { get; }

        DateTime CreationTime { get; }
        DateTime AccessTime { get; }
        DateTime ModificationTime { get; }

        bool IsOpen { get; }

        /// <summary>
        /// Updates the access time to reflect the current instant in time.
        /// </summary>
        /// <remarks>
        /// In general, this method need only be called by a session manager.
        /// </remarks>
        void MarkAccessed();

        /// <summary>
        /// Updates the modification time to reflect the current instant in time.
        /// </summary>
        /// <remarks>
        /// In general, this method need only be called by a session manager.
        /// </remarks>
        void MarkModified();

        /// <summary>
        /// Changes this session's local state to open.
        /// </summary>
        /// <remarks>
        /// This method should always return gracefully if the operation succeeds; otherwise it should
        /// generate some kind of exception.
        /// </remarks>
        /// <exception cref="NotSupportedException">If this type of session cannot be reopened.</exception>
        /// <exception cref="InvalidOperationException">If this particular session cannot be reopened.</exception>
        void Open();

        /// <summary>
        /// Changes this sessions's local state to closed.
        /// </summary>
        /// <remarks>
        /// In general, this method need only be called by a session manager.
        /// </remarks>
        void Close();
    }
}