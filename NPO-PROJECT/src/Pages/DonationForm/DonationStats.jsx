// if we show the already donated amount, we can use this component to show the stats
function DonationStats() {
    return (
        <div className="donation-stats">
            <h2>Donation Statistics</h2>
            <p>Total Donations Received: $10,000</p>
            <p>Number of Donors: 200</p>
            <p>Average Donation Amount: $50</p>
            <p>Last Donation Received: $100 on October 1, 2023</p>
        </div>
    );
}
export default DonationStats;