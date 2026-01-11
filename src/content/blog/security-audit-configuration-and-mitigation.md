---
title: "Security Audit Report: Exploiting Misconfigurations on Windows Server Infrastructure"
description: "Technical audit report on Windows Server 2008 R2 (Metasploitable 3) misconfigurations, covering Elasticsearch RCE, weak credentials, and SNMP information disclosure."
pubDate: "Jan 11 2026"
heroImage: "/images/SecurityMisconfiguration/01_Reconnaisance_Nmap.png"
tags:
  [
    "security-audit",
    "windows-server",
    "misconfiguration",
    "penetration-testing",
    "metasploit",
    "rce",
  ]
---

# Security Audit Report: Exploiting Misconfigurations on Windows Server Infrastructure

**Date:** January 11, 2026
**Team:** Red Team (Offensive Security)
**Target:** Windows Server 2008 R2 (Metasploitable 3)

---

## 1. Executive Summary

This report summarizes the results of a Configuration Security Audit conducted on the target Windows Server system. The primary goal of this assessment was to identify critical security misconfigurations and provide actionable hardening recommendations.

Overall, the target's security posture is rated as **Very Weak**. The audit revealed a combination of outdated software and insecure default configurations that allow an attacker to gain full control over the server.

**Key Findings:**

- **Remote Code Execution (RCE):** Identified in the Elasticsearch service (Critical).
- **Unauthorized Access:** Use of default credentials (Weak Credentials) on the WinRM service (Critical).
- **Information Disclosure:** SNMP protocol configured with a public community string (Medium).

---

## 2. Methodology & Execution

The assessment followed a **Gray Box Testing** methodology, where the tester has partial knowledge of the system (such as the target IP) but no access to the source code.

The tools used include:

- **Nmap:** For network scanning and service enumeration.
- **Metasploit Framework:** For automated exploitation.
- **Evil-WinRM:** For Windows remote management access.
- **Snmpwalk:** For information enumeration via SNMP.

---

## 3. Findings & Proof of Concept (PoC)

Below are the technical details of the identified vulnerabilities and the steps to reproduce them.

### VULN-001: Remote Code Execution (RCE) via Elasticsearch

- **Severity:** **Critical** (CVSS 9.8)
- **CVE:** CVE-2014-3120

#### Description

Legacy versions of Elasticsearch (pre-1.2) on the target have the _dynamic scripting_ (MVEL) feature enabled by default. This feature allows direct Java code execution via the REST API without authentication, giving attackers the ability to execute arbitrary system commands.

#### Steps to Reproduce (Proof of Concept)

1. **Reconnaissance:** An Nmap scan shows port 9200 is open, running Elasticsearch.

    ![Nmap Results](/images/SecurityMisconfiguration/01_Reconnaisance_Nmap.png)

2. **Access Verification:** Accessing the `/_nodes` endpoint via a browser confirms the service is accessible without authentication.

    ![Nodes Endpoint Access](/images/SecurityMisconfiguration/05_Access_ElasticSearch_Nodes_Without_Authentication.png)

3. **Exploitation:** Using a Metasploit module to target the CVE-2014-3120 vulnerability.

    ![Metasploit Search](/images/SecurityMisconfiguration/02_ElasticSearch_RCE_Metasploit_Search.png)

4. **Payload Execution:** After setting the target, the exploit is executed and successfully opens a Meterpreter session.

    ![Meterpreter Session](/images/SecurityMisconfiguration/03_Set_Target_IP_And_Exploit.png)

5. **System Access:** With shell access, the attacker can execute system commands such as `whoami`.

    ![System Command](/images/SecurityMisconfiguration/04_Shell_Whoami_Command.png)

#### Recommendations

- **Disable Dynamic Scripting:** Set `script.disable_dynamic: true` in `elasticsearch.yml`.
- **Upgrade:** Update Elasticsearch to the latest secure version.
- **Network Hardening:** Restrict access to port 9200 to trusted internal IPs using a firewall.

---

### VULN-002: Weak Credentials (Default User Password)

- **Severity:** **Critical** (CVSS 9.8)
- **Service:** WinRM (Port 5985)

#### Description

The target system still uses a default user account with a password that is easily guessable or publicly documented. This provides direct administrative access to attackers without needing to exploit software flaws.

#### Steps to Reproduce (Proof of Concept)

1. **Authentication:** The attacker attempts the default credentials `vagrant:vagrant` using the `evil-winrm` tool.

    ![Evil-WinRM Login](/images/SecurityMisconfiguration/UserPassword/01_Login_Using_Default_Credential_Evil_Winrm.png)

2. **Privilege Check:** After a successful login, checking the user groups reveals the account has Administrator privileges.

    ![User Group Check](/images/SecurityMisconfiguration/UserPassword/02_Vagrant_User_Group.png)

#### Recommendations

- **Change Passwords:** Immediately replace all default passwords with complex, unique ones.
- **Access Review:** Apply the principle of _least privilege_ to all user accounts.

---

### VULN-003: SNMP Misconfiguration (Information Disclosure)

- **Severity:** **Medium** (CVSS 5.3)
- **Service:** SNMP (UDP 161)

#### Description

The SNMP (Simple Network Management Protocol) service is configured with the default community string "public". This allows anyone on the network to read detailed information about the system, network interfaces, and running software.

#### Steps to Reproduce (Proof of Concept)

1. **Scanning:** Nmap detects port UDP 161 is open.

    ![Nmap SNMP](/images/SecurityMisconfiguration/SNMP/01_Nmap_Scan_UDP_Ports.png)

2. **Enumeration:** Using `snmpwalk` to extract system information (_walking the MIB_).

    ![SNMP Walk](/images/SecurityMisconfiguration/SNMP/02_Information_Disclosure.png)

#### Recommendations

- **Change Community String:** Replace "public" with a strong, unique string.
- **Disable if Unused:** If SNMP is not required for monitoring, disable the service to reduce the attack surface.

---

## 4. Conclusion

This audit highlights the critical importance of secure configuration management. The vulnerabilities found were not due to complex application logic flaws, but rather from the failure to change default configurations (passwords, scripting features, community strings).

Organizations are advised to immediately implement the hardening recommendations above and perform regular security scans to maintain infrastructure integrity.