// Function Calling with Claude
// Let's teach Claude to call some functions!

// We'll do this in a few stages:

// Explain to Claude what the function is and how to use it.
// Tell Claude to do something that requires Claude to call the function
// When Claude calls the function, pause the response, call the function in code
// Call Claude again, giving it the value returned by the code
// Return a final response to the user
// Note: There is a more automated function calling repository that you can view and use at https://github.com/anthropics/anthropic-tools. This notebook is designed to walk you through the details of how that repo works. Additionally, expect overall function calling performance and convenience to improve soon.

// Function calling can allow us to get around limitations of large language models. One of those is multiplying large numbers together. We'll implement a "calculator" function that makes this work like a dream.

// from anthropic import Anthropic
// import re
// client = Anthropic()
// MODEL_NAME = "claude-3-opus-20240229"
// First, let's look at Claude's default behavior.

// multiplication_message = {
//     "role": "user",
//     "content": "Multiply 1,984,135 by 9,343,116"
// }

// message = client.messages.create(
//     model=MODEL_NAME,
//     max_tokens=1024,
//     messages=[multiplication_message]
// ).content[0].text
// print(message)
// To multiply 1,984,135 by 9,343,116, we can use the standard multiplication algorithm. Let's start by multiplying each digit of the second number by the first number, and then add the results.

//   1,984,135
// x 9,343,116
// -----------
//  11,904,810     (1,984,135 x 6)
//  17,857,215     (1,984,135 x 9)
//  13,888,945     (1,984,135 x 7)
//   3,968,270     (1,984,135 x 2)
//   1,984,135     (1,984,135 x 1)
//  17,857,215     (1,984,135 x 9)
//  11,904,810     (1,984,135 x 6)
//   3,968,270     (1,984,135 x 2)
//  17,857,215     (1,984,135 x 9)
//  13,888,945     (1,984,135 x 7)
//  15,873,080     (1,984,135 x 8)
//   5,952,405     (1,984,135 x 3)
// -----------
// 18,529,877,865,540

// Therefore, 1,984,135 multiplied by 9,343,116 equals 18,529,877,865,540.
// answer = 1984135 * 9343116
// print(f"{answer:,}")
// 18,538,003,464,660
// Claude was within 0.01% of the right answer, but didn't get it exactly right. Let's fix that. First, we'll define our calculator function.

// def do_pairwise_arithmetic(num1, num2, operation):
//     if operation == '+':
//         return num1 + num2
//     elif operation == "-":
//         return num1 - num2
//     elif operation == "*":
//         return num1 * num2
//     elif operation == "/":
//         return num1 / num2
//     else:
//         return "Error: Operation not supported."
// Now we'll write a docstring for Claude to read.

// def construct_format_tool_for_claude_prompt(name, description, parameters):
//     constructed_prompt = (
//         "<tool_description>\n"
//         f"<tool_name>{name}</tool_name>\n"
//         "<description>\n"
//         f"{description}\n"
//         "</description>\n"
//         "<parameters>\n"
//         f"{construct_format_parameters_prompt(parameters)}\n"
//         "</parameters>\n"
//         "</tool_description>"
//     )
//     return constructed_prompt

// tool_name = "calculator"
// tool_description = """Calculator function for doing basic arithmetic.
// Supports addition, subtraction, multiplication"""

// def construct_format_parameters_prompt(parameters):
//     constructed_prompt = "\n".join(f"<parameter>\n<name>{parameter['name']}</name>\n<type>{parameter['type']}</type>\n<description>{parameter['description']}</description>\n</parameter>" for parameter in parameters)

//     return constructed_prompt

// parameters = [
//     {
//         "name": "first_operand",
//         "type": "int",
//         "description": "First operand (before the operator)"
//     },
//     {
//         "name": "second_operand",
//         "type": "int",
//         "description": "Second operand (after the operator)"
//     },
//     {
//         "name": "operator",
//         "type": "str",
//         "description": "The operation to perform. Must be either +, -, *, or /"
//     }
// ]
// tool = construct_format_tool_for_claude_prompt(tool_name, tool_description, parameters)
// print(tool)
// <tool_description>
// <tool_name>calculator</tool_name>
// <description>
// Calculator function for doing basic arithmetic.
// Supports addition, subtraction, multiplication
// </description>
// <parameters>
// <parameter>
// <name>first_operand</name>
// <type>int</type>
// <description>First operand (before the operator)</description>
// </parameter>
// <parameter>
// <name>second_operand</name>
// <type>int</type>
// <description>Second operand (after the operator)</description>
// </parameter>
// <parameter>
// <name>operator</name>
// <type>str</type>
// <description>The operation to perform. Must be either +, -, *, or /</description>
// </parameter>
// </parameters>
// </tool_description>
// Now we'll insert this tool description into a longer prompt template to form the system prompt

// def construct_tool_use_system_prompt(tools):
//     tool_use_system_prompt = (
//         "In this environment you have access to a set of tools you can use to answer the user's question.\n"
//         "\n"
//         "You may call them like this:\n"
//         "<function_calls>\n"
//         "<invoke>\n"
//         "<tool_name>$TOOL_NAME</tool_name>\n"
//         "<parameters>\n"
//         "<$PARAMETER_NAME>$PARAMETER_VALUE</$PARAMETER_NAME>\n"
//         "...\n"
//         "</parameters>\n"
//         "</invoke>\n"
//         "</function_calls>\n"
//         "\n"
//         "Here are the tools available:\n"
//         "<tools>\n"
//         + '\n'.join([tool for tool in tools]) +
//         "\n</tools>"
//     )
//     return tool_use_system_prompt

// system_prompt = construct_tool_use_system_prompt([tool])
// print(system_prompt)
// In this environment you have access to a set of tools you can use to answer the user's question.

// You may call them like this:
// <function_calls>
// <invoke>
// <tool_name>$TOOL_NAME</tool_name>
// <parameters>
// <$PARAMETER_NAME>$PARAMETER_VALUE</$PARAMETER_NAME>
// ...
// </parameters>
// </invoke>
// </function_calls>

// Here are the tools available:
// <tools>
// <tool_description>
// <tool_name>calculator</tool_name>
// <description>
// Calculator function for doing basic arithmetic.
// Supports addition, subtraction, multiplication
// </description>
// <parameters>
// <parameter>
// <name>first_operand</name>
// <type>int</type>
// <description>First operand (before the operator)</description>
// </parameter>
// <parameter>
// <name>second_operand</name>
// <type>int</type>
// <description>Second operand (after the operator)</description>
// </parameter>
// <parameter>
// <name>operator</name>
// <type>str</type>
// <description>The operation to perform. Must be either +, -, *, or /</description>
// </parameter>
// </parameters>
// </tool_description>
// </tools>
// Now all we need to do is make the harness for calling Claude with this prompt. First, let's look at Claude's output when we give it this system prompt and ask the same question we asked it before.

// function_calling_message = client.messages.create(
//     model=MODEL_NAME,
//     max_tokens=1024,
//     messages=[multiplication_message],
//     system=system_prompt,
//     stop_sequences=["\n\nHuman:", "\n\nAssistant", "</function_calls>"]
// ).content[0].text
// print(function_calling_message)
// Okay, let's break this down step-by-step:
// <function_calls>
// <invoke>
// <tool_name>calculator</tool_name>
// <parameters>
// <first_operand>1984135</first_operand>
// <second_operand>9343116</second_operand>
// <operator>*</operator>
// </parameters>
// </invoke>

// Claude did a great job calling the function correctly. Now let's extract the parameters and send them to the do_pairwise_arithmetic function.

// def extract_between_tags(tag: str, string: str, strip: bool = False) -> list[str]:
//     ext_list = re.findall(f"<{tag}>(.+?)</{tag}>", string, re.DOTALL)
//     if strip:
//         ext_list = [e.strip() for e in ext_list]
//     return ext_list

// first_operand = int(extract_between_tags("first_operand", function_calling_message)[0])
// second_operand = int(extract_between_tags("second_operand", function_calling_message)[0])
// operator = extract_between_tags("operator", function_calling_message)[0]

// result = do_pairwise_arithmetic(first_operand, second_operand, operator)
// print(f"{result:,}")
// 18,538,003,464,660
// Perfect! Now all that's left to do is to pass the return value into Claude and return the final value to the user. First we'll format in the way that Claude expects.

// def construct_successful_function_run_injection_prompt(invoke_results):
//     constructed_prompt = (
//         "<function_results>\n"
//         + '\n'.join(
//             f"<result>\n<tool_name>{res['tool_name']}</tool_name>\n<stdout>\n{res['tool_result']}\n</stdout>\n</result>"
//             for res in invoke_results
//         ) + "\n</function_results>"
//     )

//     return constructed_prompt

// formatted_results = [{
//     'tool_name': 'do_pairwise_arithmetic',
//     'tool_result': result
// }]
// function_results = construct_successful_function_run_injection_prompt(formatted_results)
// print(function_results)
// <function_results>
// <result>
// <tool_name>do_pairwise_arithmetic</tool_name>
// <stdout>
// 18538003464660
// </stdout>
// </result>
// </function_results>
// Next we'll combine the original message, Claude's partial return up to where it called the function, and the function results, to get the prompt we'll give to Claude to produce its final output. We use a prefilled message in the Assistant role to facilitate this.

// partial_assistant_message = function_calling_message + "</function_calls>" + function_results

// final_message = client.messages.create(
//     model=MODEL_NAME,
//     max_tokens=1024,
//     messages=[
//         multiplication_message,
//         {
//             "role": "assistant",
//             "content": partial_assistant_message
//         }
//     ],
//     system=system_prompt
// ).content[0].text
// print(partial_assistant_message + final_message)
// Okay, let's break this down step-by-step:
// <function_calls>
// <invoke>
// <tool_name>calculator</tool_name>
// <parameters>
// <first_operand>1984135</first_operand>
// <second_operand>9343116</second_operand>
// <operator>*</operator>
// </parameters>
// </invoke>
// </function_calls><function_results>
// <result>
// <tool_name>do_pairwise_arithmetic</tool_name>
// <stdout>
// 18538003464660
// </stdout>
// </result>
// </function_results>

// Therefore, 1,984,135 multiplied by 9,343,116 equals 18,538,003,464,660.
// Success! You can use the prompt constructors and function calling patterns defined here to implement your own functions. For instance, search, SQL, or calls to the internet. For best results, use the exact system prompt formatting and <function_calls>/<function_results> formatting shown here and in the anthropic-tools repo.

// Typescript version of the above code

import { XMLBuilder, XMLParser } from 'fast-xml-parser'
import { FunctionCall, FunctionCallResult, Tool } from './types'
import { CompletionOptions, fetchCompletion } from './completion'

function toXmlString(data: any) {
  const builder = new XMLBuilder()
  const xmlContent = builder.build(data)

  return xmlContent
}

function parseXmlString(xmlString: string) {
  const parser = new XMLParser()
  const parsedData = parser.parse(xmlString)

  return parsedData
}

export function getToolsSystemPrompt(tools: Tool[]): string {
  const systemPrompt = {
    text: [
      "In this environment you have access to a set of tools you can use to answer the user's question.",
      '',
      'You may call them like this:',
      toXmlString({
        function_calls: {
          invoke: {
            tool_name: '$TOOL_NAME',
            parameters: {
              $PARAMETER_NAME: '$PARAMETER_VALUE',
            },
          },
        },
      }),
      '',
      'Here are the tools available:',
      {
        tools: tools.map((tool) => getToolInterfacePrompt(tool)),
      },
    ],
  }

  return systemPrompt.text.join('\n')
}

function getToolInterfacePrompt(tool: Tool): string {
  // Looks like this:
  // <tool_description>
  //   <tool_name>calculator</tool_name>
  //   <description>Calculator function for doing basic arithmetic. Supports addition, subtraction, multiplication.</description>
  //   <parameters>
  //     <parameter>
  //       <name>first_operand</name>
  //       <type>int</type>
  //       <description>First operand (before the operator).</description>
  //     </parameter>
  //     <!-- Additional parameters can be added here -->
  //   </parameters>
  // </tool_description>

  return toXmlString({
    tool_description: tool,
  })
}

export function extractFunctionCalls(result: string): FunctionCall[] {
  // Claude's response looks like this:
  //
  // <function_calls>
  // <invoke>
  // <tool_name>calculator</tool_name>
  // <parameters>
  // <first_operand>1984135</first_operand>
  // <second_operand>9343116</second_operand>
  // <operator>*</operator>
  // </parameters>
  // </invoke>
  // </function_calls>
  //
  // But also might have other stuff before and after it.

  // Find the last function_calls tag and extract everything inside it (including the tags)
  const strippedResult = result.match(
    /<function_calls>([\s\S]+?)<\/function_calls>(?![\s\S]*<function_calls>)/,
  )?.[0]

  if (!strippedResult) {
    return []
  }

  const parsedResult = parseXmlString(strippedResult)

  return parsedResult.function_calls.invoke as FunctionCall[]
}

export function getFunctionResultsPrompt(results: FunctionCallResult[]): string {
  return toXmlString({
    function_results: results,
  })
}

export async function fetchFunctionCalls({
  tools,
  ...completionOptions
}: CompletionOptions & { tools: Tool[] }): Promise<FunctionCall[]> {
  const systemPrompt = getToolsSystemPrompt(tools)

  const response = await fetchCompletion({
    ...completionOptions,
    systemPrompt,
  })

  const [firstMessageContent] = response.content

  if (!firstMessageContent || !firstMessageContent.text) {
    throw new Error('Expected response.content to have at least one message')
  }

  const functionCalls = extractFunctionCalls(firstMessageContent.text)

  return functionCalls
}
