import React from "react";
import '../Leads.css';
import Image from 'react-bootstrap/Image';
import bannerImage from '../assets/banner-image-1.jpg';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useHistory } from "react-router-dom";
import { Pie, Doughnut } from 'react-chartjs-2';
import { Container } from "@material-ui/core";
ChartJS.register(ArcElement, Tooltip, Legend);


 

const jumpstartComletedField = 12;
const jumpstartTotalField = 12;
const jumpstartInComletedField = jumpstartTotalField - jumpstartComletedField;
const jumpstartPercetage = Math.round((jumpstartComletedField / jumpstartTotalField) * 100);

  export const justJumpData = {
     
    labels: [ 'Completed','Remaining'],
    datasets: [
      {
        label: '# of Votes',
        data: [jumpstartComletedField, jumpstartInComletedField],
        backgroundColor: jumpstartPercetage > 0 ?['#39971B','#FF3333']:['#ccc','#ccc'],
        // backgroundColor: [
        //   '#39971B',
        //   '#FF3333',
        // ],
        borderColor: [
          'rgba(255, 255, 255)',
          'rgba(255, 255, 255)',
        ],
        borderWidth: 2,
      },
    ],
  };


const licenceComletedField = 5;
const licenceTotalField = 7;
const licenceInComletedField = licenceTotalField-licenceComletedField;
const licencePercetage = Math.round((licenceComletedField / licenceTotalField) * 100);


export const License = {
  labels: ['Completed', 'Remaining'],
  datasets: [
    {
      label: '# of Votes',
      data: [licenceComletedField, licenceInComletedField],
      backgroundColor: licencePercetage > 0 ?['#39971B','#FF3333']:['#ccc','#ccc'],
      // backgroundColor: [
      //   '#39971B',
      //   '#FF3333',
      
      // ],
      borderColor: [
        'rgba(255, 255, 255)',
        'rgba(255, 255, 255)',
      ],
      borderWidth: 2,
    },
  ],
};


const contractsComletedField = 2;
const contractsTotalField = 12;
const contractsInComletedField = contractsTotalField - contractsComletedField;
const contractsPercetage = Math.round((contractsComletedField / contractsTotalField) * 100);


export const Contracts = {
  labels: ['Completed', 'Remaining'],
  datasets: [
    {
      label: '# of Votes',
      data: [contractsComletedField, contractsInComletedField],
      backgroundColor: contractsPercetage > 0 ?['#39971B','#FF3333']:['#ccc','#ccc'],
      // backgroundColor: [
      //   '#39971B',
      //   '#FF3333',
      // ],
      borderColor: [
        'rgba(255, 255, 255)',
        'rgba(255, 255, 255)',
      ],
      borderWidth: 2,
    },
  ],
};


const equipAndSuppComletedField = 0;
const equipAndSuppTotalField =  15;
const equipAndSuppInComletedField =  equipAndSuppTotalField - equipAndSuppComletedField;
const equipAndSuppPercetage = Math.round((equipAndSuppComletedField / equipAndSuppTotalField) * 100);

export const equipAndSupp = {
  labels: ['Completed', 'Remaining'],
  datasets: [
    {
      label: '# of Votes',
      data: [equipAndSuppComletedField, equipAndSuppInComletedField],
      backgroundColor: equipAndSuppPercetage > 0 ?['#39971B','#FF3333']:['#ccc','#ccc'],
      // backgroundColor: [
      //   '#39971B',
      //   '#FF3333',
      // ],
      labelFontColor :["#666"], 
      borderColor: [
        'rgba(255, 255, 255)',
        'rgba(255, 255, 255)',
      ],
      borderWidth: 2,
    },
  ],
};
const marketingComletedField = 1;
const marketingTotalField =  4;
const marketingInComletedField =  marketingTotalField - marketingComletedField;
const marketingPercetage = Math.round((marketingComletedField / marketingTotalField) * 100);

export const Marketing = {
  labels: ['Completed', 'Remaining'],
  datasets: [
    {
      label: '# of Votes',
      data: [marketingComletedField, marketingInComletedField],
      backgroundColor: marketingPercetage > 0 ?['#39971B','#FF3333']:['#ccc','#ccc'],
      // backgroundColor: [
      //   '#39971B',
      //   '#FF3333',
      // ],
      labelFontColor :["#666"], 
      borderColor: [
        'rgba(255, 255, 255)',
        'rgba(255, 255, 255)',
      ],
      borderWidth: 2,
    },
  ],
};

const IncompleteAlert = () => {
    alert("All previous modules must be completed first")
}

function Welcome(props) {
    const history = useHistory();

    return (
        <>    
            <Container>
            <div className="pi-chart-container">
             <div className="jumpStart">
              <h3 className="pi-chart-related">Busines Basics</h3>
               <div className="total-count">
                 <span className="total-count-text" >{jumpstartPercetage}% Completed</span>
                <Doughnut data={justJumpData}  onClick={() => props.handleToJump({activeKey: "jumpstart"})}/>
               </div>
               <span className="total-fields">{jumpstartComletedField} ∕ {jumpstartTotalField} Completed</span>
             </div>
             <div className="jumpStart">
             <h4 className="pi-chart-related">License</h4>
             <div className="total-count">
                 <span className="total-count-text" >{licencePercetage}% Completed</span>
                 <Doughnut data={License} onClick={jumpstartPercetage === 100 ? () => props.handleToJump({activeKey: "license"}): IncompleteAlert}  />
                 {/* onClick={() => props.handleToJump({activeKey: "license"})} */}
               </div>
               <span className="total-fields">{licenceComletedField} ∕ {licenceTotalField} completed</span>
             </div>
             <div className="jumpStart">
             <h4 className="pi-chart-related">Contracts</h4>
             <div className="total-count">
                 <span className="total-count-text" >{contractsPercetage}% Completed</span>
                 <Doughnut data={Contracts} onClick={licencePercetage === 100 ? () => props.handleToJump({activeKey: "contracts"}): IncompleteAlert}/>
               </div>
               <span className="total-fields"> {contractsComletedField} ∕ {contractsTotalField} Completed</span>
             </div>
             <div className="jumpStart">
             <h4 className="pi-chart-related">Equipment & Supplies </h4>
             <div className="total-count">
                 <span className="total-count-text" >{equipAndSuppPercetage}% Completed</span>
                 <Doughnut data={equipAndSupp} onClick={contractsPercetage === 100 ? () => props.handleToJump({activeKey: "marketing"}):IncompleteAlert}/>
               </div>
               <span className="total-fields"> {equipAndSuppComletedField} ∕ {equipAndSuppTotalField} Completed</span>
             </div>
            
             <div className="jumpStart">
             <h4 className="pi-chart-related">Marketing</h4>
             <div className="total-count">
                 <span className="total-count-text" >{marketingPercetage}% Completed</span>
                 <Doughnut data={Marketing} onClick={contractsPercetage === 100 ? () => props.handleToJump({activeKey: "marketing"}):IncompleteAlert}/>
               </div>
               <span className="total-fields"> {marketingComletedField} ∕ {marketingTotalField} Completed</span>
             </div>
            </div>
            </Container>
        </>
    )
};

export default Welcome;
