import React from "react";
import { Loader2 } from "lucide-react";

const Spinner = ({ size = 24, className = "" }) => {
  return (
    <Loader2 
      className={`animate-spin text-current ${className}`} 
      size={size} 
    />
  );
};

export default Spinner;
