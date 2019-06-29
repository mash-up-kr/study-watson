import React from 'react';

const main_empty = () => {

    const clickStudy = e => {
        console.log(e.target.name)
    }

    return (
        <>
            <h1>스터디를 만들고 관리해보세요!</h1>
            <button onClick={clickStudy} name="make study"> 스터디 만들기 </button>
        </>
    );
};

export default main_empty;