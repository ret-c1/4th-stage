import React, { useState } from 'react';
import { Form, Collapse, Button } from 'antd';
import PropTypes from 'prop-types';
import Ckeditor from '@components/Ckeditor';
import styled from 'styled-components';
import { searchParams } from '@utils/searchParams';
const { Panel } = Collapse;

const ScDescr = styled.div`
    img {
        max-width: 100%;
    }
    word-wrap: break-word;
    width: 100%;
    padding-top: 6px;
`;

const OtherInfo = (props) => {
    const { stage, checkFinish } = searchParams();
    const { source, detail, form } = props;
    const [currentKey, setCurrentKey] = useState({
        notice: true,
        scope: true,
        vulDesc: true,
        solution: true,
        tips: true,
    });
    const editStatus = stage === 'add' || stage === 'edit' || (stage === 'check' && !checkFinish);
    return (
        <>
            {source.indexOf('detail') !== -1 ? (
                <>
                    <Collapse
                        defaultActiveKey={['notice']}
                        onChange={() =>
                            setCurrentKey({ ...currentKey, notice: !currentKey.notice })
                        }
                    >
                        <Panel
                            showArrow={false}
                            header={source.indexOf('even') !== -1 ? '事件公告' : '漏洞公告'}
                            key="notice"
                            extra={
                                currentKey.notice ? (
                                    <Button type="link">收起</Button>
                                ) : (
                                    <Button type="link">展开</Button>
                                )
                            }
                        >
                            <ScDescr
                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                    __html: detail && detail.notice,
                                }}
                            />
                        </Panel>
                    </Collapse>
                    <Collapse
                        defaultActiveKey={['scope']}
                        style={{ marginTop: 24 }}
                        onChange={() => setCurrentKey({ ...currentKey, scope: !currentKey.scope })}
                    >
                        <Panel
                            showArrow={false}
                            header="影响范围"
                            key="scope"
                            extra={
                                currentKey.scope ? (
                                    <Button type="link">收起</Button>
                                ) : (
                                    <Button type="link">展开</Button>
                                )
                            }
                        >
                            <ScDescr
                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                    __html: detail && detail.scope,
                                }}
                            />
                        </Panel>
                    </Collapse>
                    <Collapse
                        defaultActiveKey={['vulDesc']}
                        style={{ marginTop: 24 }}
                        onChange={() =>
                            setCurrentKey({ ...currentKey, vulDesc: !currentKey.vulDesc })
                        }
                    >
                        <Panel
                            showArrow={false}
                            header={source.indexOf('even') !== -1 ? '事件描述' : '漏洞描述'}
                            key="vulDesc"
                            extra={
                                currentKey.vulDesc ? (
                                    <Button type="link">收起</Button>
                                ) : (
                                    <Button type="link">展开</Button>
                                )
                            }
                        >
                            <ScDescr
                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                    __html: detail && detail.vulDesc,
                                }}
                            />
                        </Panel>
                    </Collapse>
                    <Collapse
                        defaultActiveKey={['solution']}
                        style={{ marginTop: 24 }}
                        onChange={() =>
                            setCurrentKey({ ...currentKey, solution: !currentKey.solution })
                        }
                    >
                        <Panel
                            showArrow={false}
                            header="缓解措施"
                            key="solution"
                            extra={
                                currentKey.solution ? (
                                    <Button type="link">收起</Button>
                                ) : (
                                    <Button type="link">展开</Button>
                                )
                            }
                        >
                            <ScDescr
                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                    __html: detail && detail.solution,
                                }}
                            />
                        </Panel>
                    </Collapse>
                    <Collapse
                        defaultActiveKey={['tips']}
                        style={{ marginTop: 24 }}
                        onChange={() => setCurrentKey({ ...currentKey, tips: !currentKey.tips })}
                    >
                        <Panel
                            showArrow={false}
                            header="友情提示"
                            key="tips"
                            extra={
                                currentKey.tips ? (
                                    <Button type="link">收起</Button>
                                ) : (
                                    <Button type="link">展开</Button>
                                )
                            }
                        >
                            <ScDescr
                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                    __html: detail && detail.tips,
                                }}
                            />
                        </Panel>
                    </Collapse>
                </>
            ) : (
                <>
                    <Form.Item
                        label={source.indexOf('even') !== -1 ? '事件公告' : '漏洞公告'}
                        name="notice"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 21 }}
                    >
                        {editStatus ? (
                            <Ckeditor
                                name="notice"
                                data={detail.notice}
                                placeholder="请输入"
                                onChange={(editor) => {
                                    const data = editor.getData();
                                    form.setFieldsValue({ notice: data });
                                    // notice = editor.getData();
                                }}
                            />
                        ) : (
                            <ScDescr
                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                    __html: detail && detail.notice,
                                }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="影响范围"
                        name="scope"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 21 }}
                    >
                        {editStatus ? (
                            <Ckeditor
                                name="scope"
                                data={detail.scope}
                                placeholder="请输入"
                                onChange={(editor) => {
                                    const data = editor.getData();
                                    form.setFieldsValue({ scope: data });
                                    // scope = editor.getData();
                                }}
                            />
                        ) : (
                            <ScDescr
                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                    __html: detail && detail.scope,
                                }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={source.indexOf('even') !== -1 ? '事件描述' : '漏洞描述'}
                        name="vulDesc"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 21 }}
                    >
                        {editStatus ? (
                            <Ckeditor
                                name="vulDesc"
                                data={detail.vulDesc}
                                placeholder="例如微信群、QQ群、github，可附截图"
                                onChange={(editor) => {
                                    const data = editor.getData();
                                    form.setFieldsValue({ vulDesc: data });
                                    // vulDesc = editor.getData();
                                }}
                            />
                        ) : (
                            <ScDescr
                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                    __html: detail && detail.vulDesc,
                                }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="缓解措施"
                        name="solution"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 21 }}
                    >
                        {editStatus ? (
                            <Ckeditor
                                name="solution"
                                placeholder="请输入"
                                data={detail.solution}
                                onChange={(editor) => {
                                    const data = editor.getData();
                                    form.setFieldsValue({ solution: data });
                                    // solution = editor.getData();
                                }}
                            />
                        ) : (
                            <ScDescr
                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                    __html: detail && detail.solution,
                                }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="友情提示"
                        name="tips"
                        labelCol={{ span: 3 }}
                        wrapperCol={{ span: 21 }}
                    >
                        {editStatus ? (
                            <Ckeditor
                                name="tips"
                                placeholder="请输入"
                                data={detail.tips}
                                onChange={(editor) => {
                                    const data = editor.getData();
                                    form.setFieldsValue({ tips: data });
                                    // tips = editor.getData();
                                }}
                            />
                        ) : (
                            <ScDescr
                                dangerouslySetInnerHTML={{ /* eslint-disable-line */
                                    __html: detail && detail.tips,
                                }}
                            />
                        )}
                    </Form.Item>
                </>
            )}
        </>
    );
};
OtherInfo.propTypes = {
    source: PropTypes.string,
    detail: PropTypes.object,
    form: PropTypes.object,
};
export default OtherInfo;
