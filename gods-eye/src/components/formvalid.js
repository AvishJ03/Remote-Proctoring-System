import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';
import "./formvalid.css"
import swal from 'sweetalert';

const Formvalid = () => {
  const history = useHistory();

  //Disable Right click
  if (document.addEventListener) {
    document.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    }, false);
  }

  const [formvalid, setFormvalid] = useState('');

  function onChangeformvalid(e) {
    setFormvalid(e.target.value);
  }


  function handleClickformvalid() {
    console.log(formvalid)
    const con_db = firebase.database().ref("con_dbs");

    //console.log(Object.keys(con_db))
    con_db.on('value', (snapshot) => {
      var s = snapshot.val()
      var d = s[formvalid]
      console.log("check1")
      console.log(d)
      if (d != null) {
        var form_link = d["formlink"]
        console.log(form_link);
        sessionStorage.setItem("form_link", form_link);
        history.push("/Dashboard");
      }
      else {
        swal("Invalid Exam Code", "Please Enter A Valid Examcode", "error");
      }

    });
  };

  return (<div>
    <center>
      <h3>
        <p class="sign" align="center">Enter Exam Code To Proceed</p>
      </h3>

      <td class="text-center">
        <input type="text" id="formvalid" name="formvalid" value={formvalid} onChange={onChangeformvalid}></input><br></br>
        <Button variant="contained" onClick={handleClickformvalid}>Submit</Button>
      </td>
      <br></br>
    </center>
  </div>
  )
}

export default Formvalid;