import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const mockStatus = [
  "Actively booking mocks",
  "Preparing for mock sessions",
  "Scheduled for a mock",
  "Received mock feedback",
  "Just exploring mock interviews",
  "Not interested in mocks"
];

const InfoPanel = () => (
  <div className="space-y-5">
    {/* Needs Attention / Mock Journey */}
    <Card className="rounded-2xl">
      <CardHeader className="pb-1">
        <span className="text-xs font-bold uppercase tracking-wide text-purple-500">
          Needs attention
        </span>
        <CardTitle className="text-base mt-0.5 mb-1">
          Where are you in your mock interview journey?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {mockStatus.map((status, i) => (
          <button
            key={i}
            className="w-full py-2 text-sm font-semibold border border-gray-200 hover:border-primary rounded-full bg-white hover:bg-primary/10 text-gray-700 transition mb-0.5"
          >
            {status}
          </button>
        ))}
      </CardContent>
    </Card>

    {/* Tips & Guidance */}
    <Card className="rounded-2xl">
      <CardContent className="flex flex-col items-center p-6">
        <img src="/media/icons/shield.png" alt="Safety" className="h-10 mb-2" />
        <div className="font-bold text-sm text-gray-800 mb-1 text-center">Always practice safe sharing</div>
        <div className="text-xs text-muted-foreground text-center mb-2">
          Never disclose private info in a mock. Real feedback, real growth—safe experience every session.
        </div>
        <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Learn more</a>
      </CardContent>
    </Card>

    {/* Pro-tip / Guide */}
    <Card className="rounded-2xl">
      <CardContent className="flex flex-col items-center p-4">
        <img src="/media/icons/gudance.png" alt="Guide" className="h-12 mb-2 rounded" />
        <div className="font-bold text-sm text-gray-800 mb-1 text-center">How to Get the Most from a Mock Session</div>
        <div className="text-xs text-muted-foreground text-center mb-2">
          Structure your questions, request detailed feedback, and reflect on each session for best results.
        </div>
        <a href="#" className="text-blue-600 text-sm font-medium hover:underline">Know more</a>
      </CardContent>
    </Card>
  </div>
);

export default InfoPanel;
