import React, { useEffect, useState } from "react";

//include images into your bundle

//create your first component

const Home = () => {
    const url = 'https://playground.4geeks.com/todo/';
    const [user, setUser] = useState('');
	const [userData, setUserData] = useState([])
	const [task, setTask] = useState ('')


    const createUser = async (user) => {
        try {
            const resp = await fetch(url + 'users/' + user, {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!resp.ok) throw new Error('Not as expected');
            const data = await resp.json();
            console.log(data);
		
        } catch (error) {
            console.error(error);
        
    	};
	}

	const createTask = async (user, task) => {
        try {
            const resp = await fetch(url + 'todos/' + user, {  
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
				body: JSON.stringify ({
					"label": task,
					"is_done": false
				  }),
            });
            if (!resp.ok) throw new Error('Not as expected');
            const data = await resp.json();
            console.log(data);
            setTask('')
		
        } catch (error) {
            console.error(error);
        }
    };

	const getData = async (user) => {
        try {
            const resp = await fetch(url + 'users/' + user);
            if (!resp.ok) throw new Error('Not as expected');
            const data = await resp.json();
            console.log(data);
			setUserData(data)
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createUser(user);  
		getData(user)
        createTask(user,task)
    }


	return (	<>
	<form onSubmit={handleSubmit}>
		<input type="text" placeholder="Tipe user name" value={user} onChange={e => setUser(e.target.value)} required/>
	</form>	
		<div>
			{user? <> <h1>Welcome {user}</h1> </>: ' '}
		</div>
	<form onSubmit={handleSubmit}>
		<input type="text" placeholder="What needs to be done?" value={task} onChange={e => setTask(e.target.value)} required/>
	</form>	
	
		<ul>
            {userData.todos ? (
              userData.todos.map((el) => (
                <div className={el.is_done? 'taskDone myTasks' : 'myTasks'} key={el.id}>
                  {el.label}
                </div>
              ))
            ) : (
              <div className="noTasks">All done!</div>
            )}
          </ul>
	

	</>	);
};

export default Home;
