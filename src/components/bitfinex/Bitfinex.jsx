import { useEffect, useState } from "react";
import { cryptofacilitiesSocket } from "../../webSokets/Sokets";
import { connectionToWebSoketFunction, sendDataToSoketFunction, soketErrorHandlerFunction } from "../../webSokets/webSoketFunction";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

export default () => {

    const [dataSet, setdataSet] = useState({ bids: ['drcode', 'author_noir'] });
    useEffect(async () => {
        await connectionToWebSoketFunction()
        await cryptofacilitiesSocket.addEventListener('message', function (event) {
            let responseData = JSON.parse(event.data)
            if (responseData.bids) {
                if (responseData.bids.length > 0) {
                    setdataSet(responseData)
                    console.log(responseData);
                }
            }
        });
        await sendDataToSoketFunction({ "event": "subscribe", "feed": "book_ui_1", "product_ids": ["PI_XBTUSD"] })

        await soketErrorHandlerFunction();
    }, []);
    console.log(dataSet);


    // table 

    return <div style={{color:'white'}}>
        <h1>Socket programming</h1>
        {
            <ol>
                {
                    dataSet.bids.map((dataArray, indx) => <li>
                        {dataSet.bids[indx]} ------  {dataSet.bids[indx][1]}
                    </li>)
                }
            </ol>
        }
        {/* <Box width={{ xs: '90%', sm: '80%', md: '70%' }} margin='auto'>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                           
                        <TableRow sx={{ 'td, &:last-child th': { borderColoer: 'gray' } }}>
                            <TableCell align="center">Bids</TableCell>
                            <TableCell align="center">Bids</TableCell>
                            <TableCell align="center">Asks</TableCell>
                            <TableCell align="center">Asks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataSet.bids.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ 'td': { borderColoer: 'gray' } }}
                            >
                                <TableCell align="center">{row[0]}</TableCell>
                                <TableCell align="center">{row[1]}</TableCell>
                                <TableCell align="center">{dataSet.bids[0][0]}</TableCell>
                                <TableCell align="center">{dataSet.bids[0][0]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box> */}

    </div>
}
