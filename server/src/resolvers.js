 const contacts = [
		{ id: "1", firstName: "Nick", lastName: "Burney" },
		{ id: "2", firstName: "Donte", lastName: "Burney" },
		{ id: "3", firstName: "Khalon", lastName: "Burney" },
		{ id: "4", firstName: "Brian", lastName: "Burney" },
 ];

 export const resolvers = {
   Query: {
     contacts: () => contacts
   },
   Mutation: {
     addContact: (root, args) => {
       //use variable here prior to discussing optimisticResponse
       const newId = require('crypto').randomBytes(5).toString('hex');
       const newContact = {
					id: newId,
					firstName: args.firstName,
					lastName: args.lastName,
        };
        
       contacts.push(newContact);
       
       return newContact;
     },
     deleteContact: (root, args) => {
        const foundItem = contacts.find((item) => args.id === item.id);
        
        const index = contacts.indexOf(foundItem);
        contacts.splice(index, 1);
            
        return contacts;
     }
   }
 };