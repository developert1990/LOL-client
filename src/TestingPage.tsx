import React from 'react'

interface TestingPagePros {
    path: string;
}
export const TestingPage: React.FC<TestingPagePros> = ({ path }) => {
    return (
        <>
            <h2 data-testid="testing">Page Not Found</h2>
            <p>해당 페이지({path})를 찾을 수 없습니다.</p>
            <img
                alt="404"
                src="https://media.giphy.com/media/14uQ3cOFteDaU/giphy.gif"
            />
        </>
    )
}
