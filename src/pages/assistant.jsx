import { Helmet } from 'react-helmet-async';
import { AssistantView } from 'src/sections/assistant/view';

// ----------------------------------------------------------------------

export default function AssistantPage() {
  return (
    <>
      <Helmet>
        <title> Assistant | TSXX-Gate </title>
      </Helmet>

      <AssistantView />
    </>
  );
}
