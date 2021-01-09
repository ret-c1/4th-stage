import React from 'react';
import { Chart, Geom, Coord, View, Guide } from 'bizcharts';
import DataSet from '@antv/data-set';
import PropTypes from 'prop-types';
const { Text } = Guide;

const PieChart = (props) => {
    const { compareParams, assetKey } = props;
    const { DataView } = DataSet;
    const dv = new DataView();
    dv.source(compareParams).transform({
        type: 'percent',
        field: 'value',
        dimension: 'type',
        as: 'percent',
    });
    const types = [];
    compareParams.forEach((item) => {
        types.push(item.type);
    });
    return (
        <div>
            <Chart data={compareParams} padding={40} forceFit height={188} width={188}>
                <Coord type="theta" radius={0.8} />
                <View data={dv}>
                    <Coord type="theta" innerRadius={0.9} />
                    {types.includes('dispatchAssets') && (
                        <Geom
                            type="intervalStack"
                            position="percent"
                            color={['type', ['#1890FF', 'rgba(0,0,0,0.15)']]}
                            size={12}
                            style={{
                                stroke: '#FFFFFF',
                                lineWidth: 1,
                            }}
                        />
                    )}
                    {types.includes('effectiveEvents') && (
                        <Geom
                            type="intervalStack"
                            position="percent"
                            color={['type', ['#F5222D', '#FAAD14', '#2FC25B']]}
                            size={12}
                            style={{
                                stroke: '#FFFFFF',
                                lineWidth: 1,
                            }}
                        />
                    )}
                    <Guide>
                        {types.includes('dispatchAssets') && assetKey.dispatchAssets !== 0 && (
                            <>
                                <Text
                                    position={['50%', '50%']}
                                    content={`${(assetKey.alreadyAssets / assetKey.dispatchAssets) *
                                        100}%`}
                                    style={{
                                        lineHeight: '32px',
                                        fontSize: '18',
                                        fill: 'rgba(0,0,0,0.85)',
                                        textAlign: 'center',
                                    }}
                                />
                                <Text
                                    position={['50%', '80%']}
                                    content="排查率"
                                    style={{
                                        lineHeight: '22px',
                                        fontSize: '12',
                                        fill: 'rgba(0,0,0,0.45)',
                                        textAlign: 'center',
                                    }}
                                />
                            </>
                        )}
                        {(assetKey.effectiveEvents !== 0 ||
                            assetKey.troubleEvents !== 0 ||
                            assetKey.inEffectiveEvents !== 0) && (
                            <>
                                <Text
                                    position={['50%', '50%']}
                                    content="已排查"
                                    style={{
                                        lineHeight: '22px',
                                        fontSize: '12',
                                        fill: 'rgba(0,0,0,0.45)',
                                        textAlign: 'center',
                                    }}
                                />
                                <Text
                                    position={['50%', '80%']}
                                    content="事件分布"
                                    style={{
                                        lineHeight: '22px',
                                        fontSize: '12',
                                        fill: 'rgba(0,0,0,0.45)',
                                        textAlign: 'center',
                                    }}
                                />
                            </>
                        )}
                    </Guide>
                </View>
            </Chart>
        </div>
    );
};

PieChart.propTypes = {
    compareParams: PropTypes.array,
    assetKey: PropTypes.object,
};

export default PieChart;
