import { useState, useEffect } from "react";
import React, { PureComponent } from 'react';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data1 = [
    {
        name: 'Page A',
        priceUsd: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        priceUsd: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        priceUsd: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        priceUsd: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        priceUsd: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        priceUsd: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        priceUsd: 3490,
        pv: 4300,
        amt: 2100,
    },
];

const data01 = [
    { x: 30, y: 100 },
    { x: 30, y: 200 },
    { x: 45, y: 100 },
    { x: 50, y: 400 },
    { x: 70, y: 150 },
    { x: 100, y: 250 },
];

const xx1 = 3;

const data02 = [
    { x: 1, y: xx1, name: 'exam 1' },
    { x: 2, y: 2.3, name: 'exam 2' },
    { x: 3, y: 3.4, name: 'exam 3' },
    { x: 4, y: 4.2, name: 'final exam' },
];

const data03 = [
    { grade_e1: 0, name: 'exam 1' },
    { grade_e2: 0, name: 'exam 2' },
    { grade_e3: 0, name: 'exam 3' },
    { grade_ef: 0, name: 'final exam' }
];

function StudentGraph({ dataGraphics }) {

    const [data, setData] = useState([]);
    const [obj1, setObj1] = useState([]);


    useEffect(() => {
        if (dataGraphics.length > 0) {
            setObj1([
                {
                    y: dataGraphics[0].grade_e1,
                    name: 'exam 1'
                },
                {
                    y: dataGraphics[0].grade_e2,
                    name: 'exam 2'
                },
                {
                    y: dataGraphics[0].grade_e3,
                    name: 'exam 3'
                },
                {
                    y: dataGraphics[0].grade_ef,
                    name: 'final exam'
                }
            ]);
        } else {
            setObj1([
                { y: 0, name: 'exam 1' },
                { y: 0, name: 'exam 2' },
                { y: 0, name: 'exam 3' },
                { y: 0, name: 'final exam' }
            ]);
        }
    }, [dataGraphics]);

    return (
        <ResponsiveContainer width="95%" height={300}>
            <ScatterChart
                margin={{
                    top: 30,
                    right: 0,
                    bottom: 30,
                    left: 0,
                }}
            >
                <CartesianGrid />
                {/* <XAxis type="number" dataKey="x" name="exam" /> */}
                <XAxis dataKey="name" name="exam" />
                <YAxis type="number" dataKey="y" name="grade" />
                <Tooltip cursor={{ strokeDasharray: '2 2' }} />
                <Legend />
                {/* <Scatter name="A school" data={data01} fill="#8884d8" line shape="cross" /> */}
                <Scatter name="Exams" data={obj1} fill="#45CFDD" line shape="diamond" />
            </ScatterChart>
        </ResponsiveContainer>
    );
}


export default StudentGraph;
