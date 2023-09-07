import React, { useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import Chart from 'chart.js';

const PDFGenerator = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    // Create the graph using Chart.js
    const ctx = canvasRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Label 1', 'Label 2', 'Label 3'],
        datasets: [
          {
            label: 'Data',
            data: [12, 19, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Adding the table
    const tableData = [['Header 1', 'Header 2'], ['Data 1', 'Data 2']];
    doc.autoTable({
      head: [['Header 1', 'Header 2']],
      body: [['Data 1', 'Data 2']],
    });

    // Adding the graph
    const canvas = canvasRef.current;
    const imgData = canvas.toDataURL('image/png');
    doc.addImage(imgData, 'PNG', 10, 80, 190, 100); // Adjust the positioning and dimensions

    doc.save('document.pdf');
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
      <canvas ref={canvasRef} width="400" height="200" />
    </div>
  );
};

export default PDFGenerator;
