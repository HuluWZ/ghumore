import React from 'react';

const ActivityDetail = ({ response }) => {
    const divStyle = {
        padding: '1px',
        marginTop: '35px'
    };

    const headingStyle = {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '35px',

    };

    const filterAndStyleH4 = (htmlContent) => {
        const regex = /<h4\b[^>]*>([\s\S]*?)<\/h4>/g;
        const filteredContent = htmlContent.replace(regex, (match, content) => {
            const styledContent = `<h4 style="color: ${headingStyle.color}; font-size: ${headingStyle.fontSize}">${content}</h4>`;
            return styledContent;
        });

        return filteredContent;
    };

    const filteredOverview = filterAndStyleH4(response.overview);

    return (
        <div style={divStyle}
            dangerouslySetInnerHTML={{ __html: filteredOverview }}
        />
    );
};
// const ActivityDetail = ({ response }) => {
//     return (
//         <div style={{ padding: '20px' }}
//             dangerouslySetInnerHTML={{ __html: response.overview }}
//         />
//     )
// }
export default ActivityDetail;