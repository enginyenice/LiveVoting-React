import React from 'react'
import { Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Message() {
    return (
        <Alert variant="success mt-2">
            <span>Yeni bir oylama başlatmaya ne dersin ? </span><Link to="/createquestion"><b>Tıkla ve yeni oylama başlat</b></Link>
        </Alert>
    )
}
