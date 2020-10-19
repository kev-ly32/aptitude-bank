import React from 'react';
import '../../public/stylesheets/LandingPage.css'

function LandingPage() {
    return (
        <div>
            <section className='intro-banner'>
                <div className='container'>
                    <h1>Take control of your finances</h1>
                </div>
            </section>
            <section className='landingPageProducts'>
                <div className='productInfo'>Savings Account</div>
                <div className='productInfo'>Chequing Account</div>
                <div className='productInfo'>Investments</div>
                <div className='productInfo'>Credit Cards</div>
            </section>
        </div>
    );
}

export default LandingPage;