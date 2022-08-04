import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

const Header = ({ handleSelectAll, handleDownload, totalImage = 0 }) => {

  const handleChangeSelect = (e) => {
    handleSelectAll(e.target.checked);
  }

  return (
    <header>
      <div className='d-flex justify-content-between align-items-center'>
        <FormControlLabel control={<Checkbox />} label={`Select all (${totalImage})`} onChange={handleChangeSelect} />
        <Button size="small" variant="text" startIcon={<DownloadIcon />} onClick={handleDownload} className="btn__download">
          Download
        </Button>
      </div>
    </header>
  )
}

export default Header
