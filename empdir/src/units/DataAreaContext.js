import React from "react";

const DataAreaContext = React.createContext({
    filteredUsers: [],
    headings: [
        { name: 'Image', width: '12%' },
        { name: 'Name', width: '12%' },
        { name: 'Phone', width: '22%' },
        { name: 'Email', width: '22%' },
        { name: 'dob', width: '12%' },
      ]
});

export default DataAreaContext;