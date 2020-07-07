const initalData={
    tasks:{
        'task-1':{id:'task-1', content:'Приготовить завтрак'},
        'task-2':{id:'task-2', content:'Сходить на работу'},
        'task-3':{id:'task-3', content:'Ответить на сообщения'},
        'task-4':{id:'task-4', content:'Приготовить ужин'}
    },
    columns:{
        'columns-1':{
            id:'columns-1',
            title:'Сегодня',
            tasksIDs:['task-1','task-2','task-3','task-4'],
        },
        'columns-2':{
            id:'columns-2',
            title:'В процессе',
            tasksIDs:[],
        },
        'columns-3':{
            id:'columns-3',
            title:'Сделано',
            tasksIDs:[],
        }
    },
    columnOrder:['columns-1','columns-2','columns-3']
};
export default initalData