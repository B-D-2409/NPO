function DonationForm() {

    return (
        <div className="donation-form">
        <h1>Support Our Cause</h1>
        <form>
            <label htmlFor="donation-amount">Donation Amount:</label>
            <input type="number" id="donation-amount" name="amount" required />
    
            <label htmlFor="donor-name">Your Name:</label>
            <input type="text" id="donor-name" name="name" required />
    
            <label htmlFor="donor-email">Your Email:</label>
            <input type="email" id="donor-email" name="email" required />
    
            <button type="submit">Donate Now</button>
        </form>
        </div>
    );
}

export default DonationForm;