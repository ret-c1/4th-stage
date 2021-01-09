import React, { useState, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
// import { Button } from 'antd';
// import fullpage from 'fullpage.js';
import {
    ScAnnouncement,
    ScTitle,
    ScTaps,
    ScType1,
    ScType2,
    ScType3,
    ScType4,
    ScType5,
    ScUlBox,
    ScUl,
    ItemIcon,
} from './style';
import { getActiveLog } from '../api';

const params = {
    limit: 20,
    offset: 0,
    param: {
        targets: [2, 3, 4],
    },
};
const backGroundColor = [true, true, true, true, true];
const Announcement = () => {
    const fullRef = useRef(null);
    const [logData, setLogData] = useState([]);
    useEffect(() => {
        // new fullpage(`#${fullRef.current.id}`, { /* eslint-disable-line */
        //     css3: true,
        //     autoScrolling: true,
        // });
        fetchGetActiveLog();
    }, []);

    const fetchGetActiveLog = () => {
        getActiveLog(params).then((res) => {
            setLogData([...res.data.records]);
        });
    };

    const handleCheckType = (type) => {
        if (params.param.targets.indexOf(type) !== -1) {
            params.param.targets.splice(params.param.targets.indexOf(type), 1);
        } else {
            params.param.targets.push(type);
        }
        getActiveLog(params).then((res) => {
            setLogData([...res.data.records]);
        });
    };

    const renderTime = (createTime) => {
        const time = new Date().getTime();
        const difference = time - Number(createTime);
        const h = 60 * 60 * 1000;
        const day = 24;
        const hours = Math.round(difference / h);
        const days = Math.round(hours / day);
        const minutes = Math.round(hours * 60);
        if (hours / 24 < 1) {
            // 一天之内
            if (hours < 1) {
                // 一小时之内
                if (hours * 60 < 1) {
                    // 一分钟之内
                    return '刚刚';
                }
                return `${minutes}分钟之前`;
            }
            return `${hours}小时之前`;
        }
        return `${days}天之前`;
    };

    const changeColor = (type, status) => {
        backGroundColor[type] = status;
    };

    return (
        <ScAnnouncement>
            <ScTitle>活动</ScTitle>
            <ScTaps>
                <ScType1
                    type={backGroundColor}
                    onClick={() => {
                        handleCheckType(2);
                        changeColor(0, !backGroundColor[0]);
                    }}
                />
                <ScType2
                    type={backGroundColor}
                    onClick={() => {
                        handleCheckType(3);
                        changeColor(1, !backGroundColor[1]);
                    }}
                />
                <ScType3
                    type={backGroundColor}
                    onClick={() => {
                        handleCheckType(4);
                        changeColor(2, !backGroundColor[2]);
                    }}
                />
                <ScType4
                    type={backGroundColor}
                    onClick={() => {
                        handleCheckType(5);
                        changeColor(3, !backGroundColor[3]);
                    }}
                />
                <ScType5
                    type={backGroundColor}
                    onClick={() => {
                        handleCheckType(6);
                        changeColor(4, !backGroundColor[4]);
                    }}
                />
            </ScTaps>
            <ScUlBox>
                <ScUl ref={fullRef} id="fullpage">
                    {logData.map((item) => (
                        <li className="section fp-auto-height">
                            <ItemIcon type={item.target}>
                                <i />
                            </ItemIcon>
                            <h4>{item.title}</h4>
                            <p>{item.remark}</p>
                            <em>{renderTime(item.createTime)}</em>
                        </li>
                    ))}
                </ScUl>
            </ScUlBox>
        </ScAnnouncement>
    );
};

// Announcement.propTypes = {
//     requestLogin: PropTypes.func,
// };

export default Announcement;
