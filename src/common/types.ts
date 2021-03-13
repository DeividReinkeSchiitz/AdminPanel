import { ReactNode } from "react";

export interface ReportsI {
  fileName: string;
  shortDescription: string;
  createdAt: string;
  extend: ReactNode;
}

export interface BillI {
  billCode: number;
  name: string;
  dueDate: string;
  status: boolean;
  id: string;

  createdAt: string;
  extend: ReactNode;
}

export interface ColumnReportsI {
  id: "fileName" | "shortDescription" | "createdAt" | "extend";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

export interface ColumnBillI {
  id: "billCode" | "name" | "status" | "dueDate" | "createdAt" | "extend";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}
export interface WeekI {
  description: string;
  status: "Pendente" | "Aprovado" | "Reprovado";
  type?: "Cronograma Semanal" | "Cronograma Mensal";
  createdAt: string;
  downloadUrl: string;
  week: string;
  id: string;
  fileName: string;
}

export interface WeeksI {
  "Semana 1"?: WeekI[];
  "Semana 2"?: WeekI[];
  "Semana 3"?: WeekI[];
  "Semana 4"?: WeekI[];
  schedule?: WeekI[];
}
export interface ArtMonthDataI {
  [month: string]: WeeksI;
}
export interface ArtDataI {
  [year: string]: ArtMonthDataI;
}
export interface TypesI {}
export interface ArtsFirebaseI {
  createdAt: string;
  description: string;
  downloadUrl: string;
  month:
    | "Janeiro"
    | "Fevereiro"
    | "Março"
    | "Abril"
    | "Maio"
    | "Junho"
    | "Julho"
    | "Agosto"
    | "Setembro"
    | "Outubro"
    | "Novembro"
    | "Dezembro";
  status: "Pendente" | "Aprovado" | "Reprovado";
  type: "Arte" | "Cronograma Semanal" | "Cronograma Mensal";
  week: "Semana 1" | "Semana 2" | "Semana 3" | "Semana 4";
  year: string;
  fileName: string;
}

export interface InputValuesI {
  month?: string;
  year?: string;
  week?: string;
  type?: string;
}

export interface ApiI {
  uid: string;
  email: string;
  emailVerified: boolean;
  disabled: boolean;
  metadata: {
    lastSignInTime: any;
    creationTime: string;
  };
  tokensValidAfterTime: string;
  providerData: [
    {
      uid: string;
      email: string;
      providerId: string;
    }
  ];
}
