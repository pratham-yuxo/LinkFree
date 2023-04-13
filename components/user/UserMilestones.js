import UserMilestone from "./UserMilestone";
import Alert from "@components/Alert";

export default function UserMilestones({ data }) {
  let historicMilestones = data.milestones.filter(
    (milestone) => !milestone.isGoal
  );
  console.log("before");
  console.log(historicMilestones);
  historicMilestones.sort((a, b) => {
    // Split the date string into its month and year parts
    const aDateParts = a.date.split(" ");
    const bDateParts = b.date.split(" ");

    const aMonth = aDateParts.length > 1 ? aDateParts[0] : "January";
    const bMonth = bDateParts.length > 1 ? bDateParts[0] : "January";
    const aYear = parseInt(aDateParts[aDateParts.length - 1]);
    const bYear = parseInt(bDateParts[bDateParts.length - 1]);

    // Create valid date objects for each milestone, using the month and year values
    const aDateObj = new Date(`${aMonth} 1, ${aYear}`);
    const bDateObj = new Date(`${bMonth} 1, ${bYear}`);

    // Compare the two date objects to determine their chronological order
    if (aDateObj > bDateObj) {
      return -1;
    } else if (aDateObj < bDateObj) {
      return 1;
    } else {
      return 0;
    }
  });
  console.log("after");
  console.log(historicMilestones);

  const futureMilestones = data.milestones.filter(
    (milestone) => milestone.isGoal
  );
  return (
    <>
      {!data.milestones && <Alert type="info" message="No milestones found" />}
      <ul role="list" className="divide-y divide-primary-low mt-4">
        {data.milestones &&
          historicMilestones.map((milestone, key) => (
            <UserMilestone milestone={milestone} isGoal={false} key={key} />
          ))}
      </ul>

      {futureMilestones.length > 0 && (
        <div className="flex justify-center items-center gap-3 text-primary-low-medium my-4 text-xl p-4">
          Future Goals
        </div>
      )}

      <ul role="list" className="divide-y divide-primary-low mt-4">
        {futureMilestones.map((goal, key) => (
          <UserMilestone milestone={goal} isGoal={true} key={key} />
        ))}
      </ul>
    </>
  );
}
