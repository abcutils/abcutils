import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";

export default function (props) {
  const [loading, setLoading] = React.useState(false);

  return (
    <LoadingButton
      loading={loading}
      {...props}
      onClick={(e) => {
        if (props.onClick) {
          const promise = props.onClick(e);
          if (promise instanceof Promise) {
            setLoading(true);
            promise
              .then(() => {
                setLoading(false);
              })
              .catch(() => {
                setLoading(false);
              });
          }
        }
      }}
    ></LoadingButton>
  );
}
