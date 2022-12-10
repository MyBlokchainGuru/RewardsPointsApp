App.js: 

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function App() {
  const [points, setPoints] = useState(0);
  const [canLoadAd, setCanLoadAd] = useState(false);
  const [transaction, setTransaction] = useState(null);
  const [formStatus, setFormStatus] = useState('idle');

  useEffect(() => {
    const timer = setInterval(() => {
      loadAd();
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  async function signTransaction(transaction) {
    const signedTransaction = await ethers.sign(transaction);
    setTransaction(signedTransaction);
  }

  function showAd() {
    setTimeout(() => {
      setCanLoadAd(true);
    }, 10000);
  }

  function loadAd() {
    if (points > 0 && Date.now() - lastAdTimestamp > 60000) {
      showAd();
      setPoints(points - 1);
    }
  }

  async function submitForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await contract.claimRewards(formData.get('name'), formData.get('address'), formData.get('wallet'));
    if (result === 'success') {
      setFormStatus('success');
      setPoints(0);
    } else {
      setFormStatus('error');
    }

    const formInfo = {
      name: formData.get('name'),
      address: formData.get('address'),
      wallet: formData.get('wallet')
    };

    sendEmail(formInfo);
  }

  function sendEmail(formInfo) {
    // TODO: Implement email sending logic here
  }

  return (
    <div>
      {transaction &&
        <form onSubmit={submitForm}>
          <h1>Sign Transaction</h1>
          <p>Please sign the following transaction to authenticate yourself:</p>
          <pre>{transaction}</pre>
          <button type="button" onClick={() => signTransaction(transaction)}>Sign</button>
        </form>
      }

      {formStatus === 'success' &&
        <p>Thanks for claiming your rewards!</p>
      }
}

      {formStatus === 'idle' &&
        <div>
          <p>You have {points} points available.</p>
          {canLoadAd &&
            <button type="button" onClick={loadAd}>Load Ad</button>
          }

          {points > 0 &&
            <form onSubmit={submitForm}>
              <h1>Claim Rewards</h1>
              <label>
                Name:
                <input type="text" name="name" required />
              </label>
              <label>
                Shipping Address:
                <input type="text" name="address" required />
              </label>
              <label>
                Ethereum Wallet:
                <input type="text" name="wallet" required />
              </label>
              <button type="submit">Submit</button>
            </form>
          }
        </div>
      }
    </div>
  );
}

export default App;
