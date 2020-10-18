import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable/index';
import NavBar from '../NavBar/index';
import API from '../../units/API';
import './DataArea.css';
import DataAreaContext from '../../units/DataAreaContext';

const DataArea = () => {
  const [developerState, setDeveloperState] = useState({
    users: [],
    order: 'ascend',
    filteredUsers: [],
    headings: [
      { name: 'Image', width: '12%' },
      { name: 'Name', width: '12%' },
      { name: 'Phone', width: '22%' },
      { name: 'Email', width: '22%' },
      { name: 'dob', width: '12%' },
    ],
  });

  const handleSort = (heading) => {
    if (developerState.order === 'descend') {
      setDeveloperState({
        order: 'ascend',
      });
    } else {
      setDeveloperState({
        order: 'descend',
      });
    }

    const compareFnc = (a, b) => {
      if (developerState.order === 'ascend') {
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        } else if (heading === 'name') {
          return a[heading].first.localeCompare(b[heading].first);
        } else {
          return b[heading] - a[heading];
        }
      } else {
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        } else if (heading === 'name') {
          return b[heading].first.localeCompare(a[heading].first);
        } else {
          return b[heading] - a[heading];
        }
      }
    };
    const sortedUsers = developerState.filteredUsers.sort(compareFnc);

    const updatedHeadings = developerState.headings;

    setDeveloperState({
      ...developerState,
      filteredUsers: sortedUsers,
      headings: updatedHeadings,
    });
  };
 
  const handleSearchChange = (event) => {
    const filter = event.target.value;
    console.log(filter);
    const filteredList = developerState.users.filter((item) => {
      let values = item.name.first.toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });

    setDeveloperState({
      ...developerState,
      filteredUsers: filteredList,
    });
  };

  useEffect(() => {
    API.getUsers().then((results) => {
      setDeveloperState({
        ...developerState,
        users: results.data.results,
        filteredUsers: results.data.results,
      });
    });
  }, []);

  return (
    <DataAreaContext.Provider
      value={{ developerState, handleSearchChange, handleSort }}
    >
      <NavBar />
      <div className="data-area">
        {/* {console.log(developerState)} */}

        {developerState.filteredUsers.length > 0 ? (
          <DataTable
            filteredUsers={developerState.filteredUsers}
            headings={developerState.headings}
            order={developerState.order}
          />
        ) : (
          <div></div>
        )}
      </div> 
    </DataAreaContext.Provider>
  );
};

export default DataArea;