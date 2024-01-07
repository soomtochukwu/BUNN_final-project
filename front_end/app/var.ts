export const governor_abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "utility_token_address_",
                type: "address",
            },
            {
                internalType: "address",
                name: "upgraded_logic_contract",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    { inputs: [], name: "MathOverflowedMulDiv", type: "error" },
    {
        anonymous: false,
        inputs: [
            { indexed: false, internalType: "string", name: "title", type: "string" },
            {
                indexed: false,
                internalType: "uint256",
                name: "topic_id",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "implemented",
                type: "bool",
            },
        ],
        name: "decision_implemented",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "newAdmin",
                type: "address",
            },
        ],
        name: "new_Admin",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "new_member",
                type: "address",
            },
        ],
        name: "new_member",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "proposer",
                type: "address",
            },
            { indexed: false, internalType: "string", name: "topic", type: "string" },
        ],
        name: "proposal_made",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "demotedAdmin",
                type: "address",
            },
        ],
        name: "remove_Admin",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "participant",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "topic_acted_on",
                type: "uint256",
            },
            { indexed: false, internalType: "bool", name: "position", type: "bool" },
        ],
        name: "vote_cast",
        type: "event",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "Members",
        outputs: [
            { internalType: "string", name: "name", type: "string" },
            { internalType: "bool", name: "belongs", type: "bool" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "Topics",
        outputs: [
            { internalType: "uint256", name: "id", type: "uint256" },
            { internalType: "string", name: "title", type: "string" },
            { internalType: "address", name: "initiator", type: "address" },
            { internalType: "string", name: "details", type: "string" },
            {
                internalType: "address",
                name: "implementation_contract_address",
                type: "address",
            },
            { internalType: "string", name: "signature", type: "string" },
            { internalType: "uint256", name: "start_time", type: "uint256" },
            { internalType: "bool", name: "executed", type: "bool" },
            { internalType: "bool", name: "cancelled", type: "bool" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "upgraded_logic_contract",
                type: "address",
            },
        ],
        name: "UPGRADE",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "upgraded_utility_token",
                type: "address",
            },
        ],
        name: "UPGRADE_UTA",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "newAdmin", type: "address" }],
        name: "addAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "", type: "address" }],
        name: "admin",
        outputs: [
            { internalType: "bool", name: "is_admin", type: "bool" },
            { internalType: "uint256", name: "removers", type: "uint256" },
            { internalType: "uint256", name: "adders", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "", type: "address" },
            { internalType: "uint256", name: "", type: "uint256" },
        ],
        name: "ballots",
        outputs: [
            { internalType: "uint256", name: "Topic_ID", type: "uint256" },
            { internalType: "bool", name: "position", type: "bool" },
            { internalType: "bool", name: "voted", type: "bool" },
            { internalType: "uint256", name: "voting_power", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "topic_id", type: "uint256" }],
        name: "cancel_Topic",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "topic_id", type: "uint256" },
            { internalType: "bool", name: "position_", type: "bool" },
        ],
        name: "cast_vote",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "counter",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "topic_id", type: "uint256" },
            { internalType: "bool", name: "_override", type: "bool" },
        ],
        name: "implement_decision",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "implementation_delay",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "string", name: "title_", type: "string" },
            { internalType: "string", name: "details_", type: "string" },
            {
                internalType: "address",
                name: "implementation_contract_address_",
                type: "address",
            },
            { internalType: "string", name: "signature_", type: "string" },
        ],
        name: "initiate_topic",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "logic_contract",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "target", type: "uint256" },
            { internalType: "uint256", name: "comparison", type: "uint256" },
        ],
        name: "quorum",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "pure",
        type: "function",
    },
    {
        inputs: [{ internalType: "string", name: "name_", type: "string" }],
        name: "register",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "demotedAdmin", type: "address" },
        ],
        name: "removeAdmin",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "returned",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "utility_token_address",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        name: "votes",
        outputs: [
            { internalType: "uint256", name: "for_votes", type: "uint256" },
            { internalType: "uint256", name: "against_votes", type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "voting_duration",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
];

export const utility_token_abi = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "from", type: "address" },
            { indexed: true, internalType: "address", name: "to", type: "address" },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            { internalType: "address", name: "owner", type: "address" },
            { internalType: "address", name: "spender", type: "address" },
        ],
        name: "allowance",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "approve",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "account", type: "address" }],
        name: "balanceOf",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "buy_tokens",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "subtractedValue", type: "uint256" },
        ],
        name: "decreaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "spender", type: "address" },
            { internalType: "uint256", name: "addedValue", type: "uint256" },
        ],
        name: "increaseAllowance",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "account", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [{ internalType: "string", name: "", type: "string" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transfer",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "from", type: "address" },
            { internalType: "address", name: "to", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "transferFrom",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "holder", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
        ],
        name: "withdraw_funds",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];

export const governor_address = "0x18DD2b2b195565209aF92F123639fae323e31AEB";

export const utility_token_address =
    "0xA92CBB9380f9311D876477Fa78Ad1e00f61A858f";
