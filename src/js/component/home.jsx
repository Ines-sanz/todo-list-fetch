import React, { useEffect, useState } from "react";

const Home = () => {
    const url = 'https://playground.4geeks.com/todo/';
    const [user, setUser] = useState('');
    const [userData, setUserData] = useState([]);
    const [task, setTask] = useState('');

    const createUser = async (user) => {
        try {
            const resp = await fetch(url + 'users/' + user, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!resp.ok) throw new Error('Not as expected');
            console.log("Usuario creado:", user);
        } catch (error) {
            console.error(error);
        }
    };

  
    const createTask = async (user, task) => {
        try {
            const resp = await fetch(url + 'todos/' + user, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "label": task,
                    "is_done": false
                }),
            });
            if (!resp.ok) throw new Error('Not as expected');
            const data = await resp.json()
            console.log("Tarea creada:", task);
            setTask('');
            setUserData({...userData, ['todos']:[data, ...userData.todos]}) 
        } catch (error) {
            console.error(error);
        }
    };
  
    const getData = async (user) => {
        try {
            const resp = await fetch(url + 'users/' + user);
            if (!resp.ok) throw new Error('Not as expected');
            const data = await resp.json();
            setUserData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUserSubmit = (e) => {
        e.preventDefault();
        createUser(user);
        getData(user);
    };

   
    const handleTaskSubmit = (e) => {
        e.preventDefault(); 
        user? createTask(user, task) : alert('User required');
        
    };

    const handleDelete = async (id) => {
        try {
            const resp = await fetch(url + 'todos/' + id, {
                method: 'DELETE',
            });
            if (!resp.ok) throw new Error('Error al eliminar la tarea del servidor');
            setUserData((prevData) => ({
                ...prevData,
                todos: prevData.todos.filter((task) => task.id !== id)
            }));
        } catch (error) {
            console.error(error);
        }
    };

    const handleDone = async (task) => {
        try {
            const resp = await fetch(url + 'todos/' + task.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "label": task.label,
                    "is_done": !task.is_done,
                })
            });
            if (!resp.ok) throw new Error('Error al eliminar la tarea del servidor');
           getData(user)
        } catch (error) {
            console.error(error);
        }
    };
    
    useEffect(() => {
        document.querySelector('.userInput').focus(); 
    }, []);

    return (
        <div className="myContainer">
         <div className="myCard col-10 col-sm-8 col-md-6 col-lg-4">
            <form onSubmit={handleUserSubmit}>
                <input className="userInput" type="text" placeholder="Type user name" value={user} onLoad={focus} onChange={e => setUser(e.target.value)} required />
            </form>

            <div className="welcome">
                {user && <p>Welcome {user}</p>}
            </div>
<div className="taskContainer">
            <form onSubmit={handleTaskSubmit}>
                <input className="taskInput" type="text" placeholder="What needs to be done?" value={task} onChange={e => setTask(e.target.value)} required />
            </form>

           
            <div>
                {userData.todos ? (
                    userData.todos.map((el) => (
                        <div className={el.is_done? 'taskDone myTasks' : 'myTasks'} key={el.id}>
                            {el.label}
                            <div>
                  <span
                  className={el.is_done? 'fa-solid fa-check doneIsDone' : 'fa-solid fa-check done'}
                    onClick={() => handleDone(el)}
                  ></span>
                  <span
                    className="fa-solid fa-xmark delete"
                    onClick={() => handleDelete(el.id)}
                  ></span>
                  </div>
                        </div>
                    ))
                ) : (
                    <div className="noTasks">All done!</div>
                )}
            </div>
            </div>
            </div>
    </div>
    );
};

export default Home;