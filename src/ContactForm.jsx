import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './ContactForm.css';

const BulkUpload = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [fileName, setFileName] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // Define required fields - customize these according to your needs
  const requiredFields = ['name', 'email', 'phone', 'address'];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      if (jsonData.length > 0) {
        const headerKeys = Object.keys(jsonData[0]);
        setHeaders(headerKeys);
        setData(jsonData);
        validateData(jsonData, headerKeys);
      }
    };

    reader.readAsBinaryString(file);
  };

  const validateData = (jsonData, headerKeys) => {
    const errors = {};
    
    // Normalize headers to lowercase for comparison
    const normalizedHeaders = headerKeys.map(h => h.toLowerCase().trim());
    
    // Check if all required fields are present in headers
    const missingFields = requiredFields.filter(
      field => !normalizedHeaders.includes(field.toLowerCase())
    );

    if (missingFields.length > 0) {
      errors.missingColumns = missingFields;
    }

    // Validate each row for required fields
    jsonData.forEach((row, index) => {
      const rowErrors = [];
      requiredFields.forEach(field => {
        const headerMatch = headerKeys.find(
          h => h.toLowerCase().trim() === field.toLowerCase()
        );
        
        if (headerMatch && (!row[headerMatch] || row[headerMatch].toString().trim() === '')) {
          rowErrors.push(field);
        }
      });

      if (rowErrors.length > 0) {
        errors[`row_${index}`] = rowErrors;
      }
    });

    setValidationErrors(errors);
  };

  const isFieldRequired = (header) => {
    return requiredFields.some(
      field => field.toLowerCase() === header.toLowerCase().trim()
    );
  };

  const hasRowError = (rowIndex) => {
    return validationErrors[`row_${rowIndex}`];
  };

  const isCellEmpty = (value, header, rowIndex) => {
    if (!isFieldRequired(header)) return false;
    const rowErrors = validationErrors[`row_${rowIndex}`];
    if (!rowErrors) return false;
    return rowErrors.some(
      field => field.toLowerCase() === header.toLowerCase().trim()
    );
  };

  const handleSubmit = () => {
    if (Object.keys(validationErrors).length > 0) {
      alert('Please fix validation errors before submitting!');
      return;
    }

    if (data.length === 0) {
      alert('Please upload a file first!');
      return;
    }

    console.log('Data to be submitted:', data);
    alert('Data validation successful! Ready to submit to backend.');
    // Backend submission will be implemented later
  };

  const handleClear = () => {
    setData([]);
    setHeaders([]);
    setFileName('');
    setValidationErrors({});
    document.getElementById('fileInput').value = '';
  };

  return (
    <div className="bulk-upload-container">
      <div className="upload-header">
        <h1>Bulk Data Upload</h1>
        <p>Upload your Excel file to import data</p>
      </div>

      <div className="upload-section">
        <div className="file-input-wrapper">
          <input
            id="fileInput"
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileUpload}
            className="file-input"
          />
          <label htmlFor="fileInput" className="file-label">
            <span className="upload-icon">📁</span>
            <span>Choose Excel File</span>
          </label>
          {fileName && <span className="file-name">{fileName}</span>}
        </div>

        {data.length > 0 && (
          <button onClick={handleClear} className="clear-btn">
            Clear Data
          </button>
        )}
      </div>

      {validationErrors.missingColumns && (
        <div className="error-banner">
          <strong>Missing Required Columns:</strong>{' '}
          {validationErrors.missingColumns.join(', ')}
        </div>
      )}

      {data.length > 0 && (
        <>
          <div className="data-info">
            <span className="record-count">
              Total Records: <strong>{data.length}</strong>
            </span>
            <span className="error-count">
              {Object.keys(validationErrors).filter(k => k.startsWith('row_')).length > 0 ? (
                <span className="error-text">
                  Errors: {Object.keys(validationErrors).filter(k => k.startsWith('row_')).length}
                </span>
              ) : (
                <span className="success-text">✓ All validations passed</span>
              )}
            </span>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="row-number">#</th>
                  {headers.map((header, index) => (
                    <th key={index}>
                      {header}
                      {isFieldRequired(header) && (
                        <span className="required-asterisk">*</span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={hasRowError(rowIndex) ? 'error-row' : ''}
                  >
                    <td className="row-number">{rowIndex + 1}</td>
                    {headers.map((header, colIndex) => (
                      <td
                        key={colIndex}
                        className={
                          isCellEmpty(row[header], header, rowIndex)
                            ? 'error-cell'
                            : ''
                        }
                      >
                        {row[header] || (
                          <span className="empty-cell">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="submit-section">
            <button
              onClick={handleSubmit}
              className="submit-btn"
              disabled={Object.keys(validationErrors).length > 0}
            >
              Submit Data
            </button>
          </div>
        </>
      )}

      {data.length === 0 && !fileName && (
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>No data uploaded yet</h3>
          <p>Upload an Excel file to view and validate your data</p>
          <div className="required-fields-info">
            <strong>Required Fields:</strong>
            <div className="fields-list">
              {requiredFields.map((field, index) => (
                <span key={index} className="field-badge">
                  {field}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkUpload;